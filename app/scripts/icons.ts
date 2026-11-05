/**
 * Generates every Koko icon from the master mark: npm run icons
 *
 * Source of truth: public/brand/koko-mark.svg (same geometry and colours as
 * the header logo in src/components/layout/Brand.tsx). Fonts (OFL) for the
 * wordmark and the link preview: assets/brand/fonts/. Text is converted to
 * vector paths, so the result does not depend on the fonts installed here.
 *
 * Output (all committed, all public):
 *   public/brand/koko-logo.svg            mark + "Koko" wordmark
 *   src/app/favicon.ico                   16, 32, 48
 *   src/app/icon.svg, src/app/icon.png    browser tab (SVG) + 512 PNG
 *   src/app/apple-icon.png                180, opaque cream background
 *   public/icons/icon-{192,512}.png       PWA, purpose "any"
 *   public/icons/maskable-{192,512}.png   PWA, purpose "maskable"
 *   public/icons/monochrome-512.png       Android themed icon
 *   src/app/{opengraph,twitter}-image.png 1200x630 link preview
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { parse as parseFont, type Font, type Glyph, type Path } from "opentype.js";

const APP_DIR = path.resolve(__dirname, "..");
const out = (...parts: string[]) => path.join(APP_DIR, ...parts);

/** Brand colours, as used in the header logo and the theme (tailwind.config.ts). */
export const BRAND = {
  primary: "#9e3b5a", // arch and wordmark (text-primary)
  knock: "#d98e73", // the "knock" dot
  badge: "#fdeced", // bg-primary-fixed/40 (#ffd9e2 at 40%) on the cream surface
  cream: "#fcf8f5", // surface / background
  ink: "#2d2530", // on-surface
  inkSoft: "#5e5360", // secondary text
};

// ---------------------------------------------------------------------------
// The mark

const MASTER = readFileSync(out("public", "brand", "koko-mark.svg"), "utf8");
const MASTER_PATH = MASTER.match(/<path\b[^>]*\bd="([^"]+)"/)?.[1];
const MASTER_DOT = MASTER.match(/<circle\b[^>]*\bcx="([\d.]+)"[^>]*\bcy="([\d.]+)"[^>]*\br="([\d.]+)"/);
const MASTER_STROKE = Number(MASTER.match(/stroke-width="([\d.]+)"/)?.[1]);
if (!MASTER_PATH || !MASTER_DOT || !MASTER_STROKE) {
  throw new Error("public/brand/koko-mark.svg: path, circle or stroke-width not found");
}

interface MarkOptions {
  /** Centre of the mark in the target canvas */
  cx: number;
  cy: number;
  /** Visual height of the mark (outer edge of the stroke) */
  height: number;
  /**
   * Stroke width in master units. The master uses 8; tiny favicons use a
   * slightly bolder stroke so the arch stays visible at 16 px (same shape).
   */
  stroke?: number;
  /** Single colour for the whole mark (monochrome icon) */
  mono?: string;
  /** Radius of the knock dot in master units (bigger only in tiny favicons) */
  dot?: number;
}

/** The mark from the master file, placed so its visible outline is centred. */
function mark({ cx, cy, height, stroke = MASTER_STROKE, mono, dot }: MarkOptions): string {
  const half = stroke / 2;
  // Visible bounds of the arch (x 15..85, y 15..110 in the master) plus half the stroke
  const box = { x: 15 - half, y: 15 - half, w: 70 + stroke, h: 95 + stroke };
  const scale = height / box.h;
  const width = box.w * scale;
  const [, dx, dy, r] = MASTER_DOT!;
  return `<svg x="${(cx - width / 2).toFixed(3)}" y="${(cy - height / 2).toFixed(3)}" width="${width.toFixed(3)}" height="${height.toFixed(3)}" viewBox="${box.x} ${box.y} ${box.w} ${box.h}">
    <path d="${MASTER_PATH}" fill="none" stroke="${mono ?? BRAND.primary}" stroke-width="${stroke}" stroke-linecap="round"/>
    <circle cx="${dx}" cy="${dy}" r="${dot ?? r}" fill="${mono ?? BRAND.knock}"/>
  </svg>`;
}

const svg = (w: number, h: number, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

/** Round badge, exactly like the header: light pink circle + mark. */
function badge(
  size: number,
  { heightRatio = 0.57, stroke, dot }: { heightRatio?: number; stroke?: number; dot?: number } = {}
) {
  const c = size / 2;
  return `<circle cx="${c}" cy="${c}" r="${c}" fill="${BRAND.badge}"/>${mark({ cx: c, cy: c, height: size * heightRatio, stroke, dot })}`;
}

/** Full-bleed square (iOS, Android maskable): no transparency anywhere. */
function fullBleed(size: number, heightRatio: number) {
  const c = size / 2;
  return `<rect width="${size}" height="${size}" fill="${BRAND.cream}"/>${mark({ cx: c, cy: c, height: size * heightRatio })}`;
}

// Small favicons (16-64 px): bigger mark inside the circle, bolder stroke and
// dot, so the door and its knock stay visible. Same shape, same colours.
const SMALL = { heightRatio: 0.64, stroke: 11, dot: 8.5 };

// ---------------------------------------------------------------------------
// Text as vector paths

function font(file: string): Font {
  const data = readFileSync(out("assets", "brand", "fonts", file));
  return parseFont(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer);
}
const QUICKSAND_BOLD = font("Quicksand-Bold.ttf");
const JAKARTA_MEDIUM = font("PlusJakartaSans-Medium.ttf");

/**
 * Glyph-by-glyph layout with kerning. (opentype.js's own text shaping trips
 * on some OpenType features of these fonts; Latin text needs none of them.)
 */
function layout(f: Font, value: string, size: number, x: number, y: number): Path[] {
  const scale = size / f.unitsPerEm;
  const paths: Path[] = [];
  let pen = x;
  let previous: Glyph | null = null;
  for (const char of value.normalize("NFC")) {
    const glyph = f.charToGlyph(char);
    if (previous) pen += (Number(f.getKerningValue(previous, glyph)) || 0) * scale;
    paths.push(glyph.getPath(pen, y, size));
    pen += (Number(glyph.advanceWidth) || 0) * scale;
    previous = glyph;
  }
  return paths;
}

/** SVG path data from raw glyph commands (opentype.js 2's own serialiser emits NaN). */
function pathData(glyphPath: Path): string {
  const n = (value: number) => {
    if (!Number.isFinite(value)) throw new Error("Tracé de glyphe invalide");
    return value.toFixed(2);
  };
  return glyphPath.commands
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${n(c.x!)} ${n(c.y!)}`;
        case "Q":
          return `Q${n(c.x1!)} ${n(c.y1!)} ${n(c.x!)} ${n(c.y!)}`;
        case "C":
          return `C${n(c.x1!)} ${n(c.y1!)} ${n(c.x2!)} ${n(c.y2!)} ${n(c.x!)} ${n(c.y!)}`;
        default:
          return "Z";
      }
    })
    .join("");
}

/** Text converted to a path, positioned by its visible bounding box. */
function text(
  f: Font,
  value: string,
  size: number,
  fill: string,
  place: { x: number; centerY: number; align?: "left" | "center" }
): { svg: string; width: number } {
  const bounds = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
  for (const glyphPath of layout(f, value, size, 0, 0)) {
    const box = glyphPath.getBoundingBox();
    if (box.x1 === box.x2) continue; // space
    bounds.x1 = Math.min(bounds.x1, box.x1);
    bounds.y1 = Math.min(bounds.y1, box.y1);
    bounds.x2 = Math.max(bounds.x2, box.x2);
    bounds.y2 = Math.max(bounds.y2, box.y2);
  }
  const width = bounds.x2 - bounds.x1;
  const left = place.align === "center" ? place.x - width / 2 : place.x;
  const d = layout(f, value, size, left - bounds.x1, place.centerY - (bounds.y1 + bounds.y2) / 2)
    .map(pathData)
    .join("");
  return { svg: `<path d="${d}" fill="${fill}"/>`, width };
}

// ---------------------------------------------------------------------------
// Files

async function png(svgSource: string, size: { w: number; h: number }, file: string, opaque = false) {
  let image = sharp(Buffer.from(svgSource), { density: 72 }).resize(size.w, size.h);
  if (opaque) image = image.flatten({ background: BRAND.cream });
  const buffer = await image.png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(file, buffer);
  return buffer;
}

/** ICO container holding PNG images (supported by every current browser). */
function ico(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // icon
  header.writeUInt16LE(images.length, 4);
  const entries: Buffer[] = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

async function main() {
  mkdirSync(out("public", "icons"), { recursive: true });
  const written: string[] = [];
  const note = (file: string) => written.push(path.relative(APP_DIR, file).split(path.sep).join("/"));

  // Full logo: badge + wordmark, as in the header (vector, text as paths)
  {
    const h = 96;
    const word = text(QUICKSAND_BOLD, "Koko", 64, BRAND.primary, { x: h + 24, centerY: h / 2 });
    const w = Math.ceil(h + 24 + word.width + 4);
    const file = out("public", "brand", "koko-logo.svg");
    writeFileSync(
      file,
      svg(w, h, `<title>Koko</title>${badge(h)}${word.svg}`).replace("<svg ", '<svg role="img" aria-label="Koko" ')
    );
    note(file);
  }

  // Browser tab, vector. The light badge keeps the mark visible on dark tabs too.
  {
    const file = out("src", "app", "icon.svg");
    writeFileSync(file, svg(64, 64, badge(64, SMALL)));
    note(file);
  }

  // favicon.ico: 16, 32, 48 (rendered at 8x then reduced, for clean edges)
  {
    const images = [];
    for (const size of [16, 32, 48]) {
      const data = await sharp(Buffer.from(svg(size * 8, size * 8, badge(size * 8, SMALL))))
        .resize(size, size, { kernel: "lanczos3" })
        .png()
        .toBuffer();
      images.push({ size, data });
    }
    const file = out("src", "app", "favicon.ico");
    writeFileSync(file, ico(images));
    note(file);
  }

  // Large "any" icons: the header badge, transparent corners
  for (const [size, file] of [
    [512, out("src", "app", "icon.png")],
    [192, out("public", "icons", "icon-192.png")],
    [512, out("public", "icons", "icon-512.png")],
  ] as const) {
    await png(svg(size, size, badge(size)), { w: size, h: size }, file);
    note(file);
  }

  // iOS: opaque (transparency becomes black), iOS rounds the corners itself
  {
    const file = out("src", "app", "apple-icon.png");
    await png(svg(180, 180, fullBleed(180, 0.58)), { w: 180, h: 180 }, file, true);
    note(file);
  }

  // Android maskable: background edge to edge, mark inside the central 60%
  for (const size of [192, 512]) {
    const file = out("public", "icons", `maskable-${size}.png`);
    await png(svg(size, size, fullBleed(size, 0.5)), { w: size, h: size }, file, true);
    note(file);
  }

  // Android themed icon: one colour on transparent, inside the safe zone
  {
    const size = 512;
    const file = out("public", "icons", "monochrome-512.png");
    await png(svg(size, size, mark({ cx: size / 2, cy: size / 2, height: size * 0.5, mono: "#ffffff" })), { w: size, h: size }, file);
    note(file);
  }

  // Link preview (WhatsApp, Facebook, Telegram, X…): logo, name, slogan
  {
    const W = 1200;
    const H = 630;
    const arches = [
      // Soft decorative arches, echoing the door motif of the design system
      `<path d="M-60 700V330C-60 220 30 130 140 130C250 130 340 220 340 330V700Z" fill="#ffd9e2" opacity="0.45"/>`,
      `<path d="M900 700V260C900 140 997 43 1117 43C1237 43 1334 140 1334 260V700Z" fill="#ffd9e2" opacity="0.45"/>`,
    ].join("");
    const logoSize = 168;
    const name = text(QUICKSAND_BOLD, "Koko", 128, BRAND.primary, { x: W / 2, centerY: 352, align: "center" });
    const slogan = text(JAKARTA_MEDIUM, "Frappe à la porte de ton bien-être intime.", 42, BRAND.ink, {
      x: W / 2,
      centerY: 476,
      align: "center",
    });
    const body =
      `<rect width="${W}" height="${H}" fill="${BRAND.cream}"/>${arches}` +
      `<g transform="translate(${(W - logoSize) / 2} 96)">${badge(logoSize)}</g>` +
      name.svg +
      slogan.svg;
    for (const name of ["opengraph-image.png", "twitter-image.png"]) {
      const file = out("src", "app", name);
      await png(svg(W, H, body), { w: W, h: H }, file, true);
      note(file);
    }
    for (const [name, alt] of [
      ["opengraph-image.alt.txt", "Koko : frappe à la porte de ton bien-être intime."],
      ["twitter-image.alt.txt", "Koko : frappe à la porte de ton bien-être intime."],
    ]) {
      writeFileSync(out("src", "app", name), alt);
    }
  }

  console.log(`Icônes générées depuis public/brand/koko-mark.svg :\n  ${written.join("\n  ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
