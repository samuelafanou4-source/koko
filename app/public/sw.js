/*
 * Koko service worker (hand-written, no build step).
 *
 * Privacy rules (shared phones):
 * - pages (navigations) are NEVER cached: offline, she always gets /offline,
 *   never a stale private page;
 * - /api/* is NEVER touched;
 * - only build assets with hashed names, public icons/images, the manifest
 *   and the offline fallback are cached.
 *
 * Bump CACHE_VERSION to purge every older cache on all devices.
 */
const CACHE_VERSION = "v3";
const CACHE_NAME = `koko-static-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [OFFLINE_URL, "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

// Paths whose responses may be stored (all public, none user-specific)
const CACHEABLE_PREFIXES = ["/_next/static/", "/_next/image", "/icons/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          // No cookies: the cached copy can never be personalised
          fetch(new Request(url, { credentials: "omit", cache: "reload" })).then((response) => {
            if (response.ok && !response.redirected) {
              return cache.put(url, response);
            }
            return undefined;
          })
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      // Drops every older cache (v1/v2 could hold the landing page)
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function isCacheable(url, request) {
  if (request.method !== "GET") return false;
  if (url.origin !== self.location.origin) return false;
  if (url.pathname === "/manifest.json") return true;
  return CACHEABLE_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
}

function shouldStore(response) {
  if (!response || response.status !== 200 || response.type !== "basic") return false;
  const cacheControl = response.headers.get("Cache-Control") || "";
  return !/no-store|private/i.test(cacheControl);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // STRICT RULE: never cache API responses
  if (url.origin === self.location.origin && url.pathname.startsWith("/api/")) {
    return;
  }

  // Pages: always the network; offline → the offline page, never a cached page
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((res) => res || Response.error())
      )
    );
    return;
  }

  if (!isCacheable(url, request)) return;

  // Hashed build assets: cache first
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((networkRes) => {
          if (shouldStore(networkRes)) {
            const copy = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkRes;
        });
      })
    );
    return;
  }

  // Other public assets keep a stable URL: network first, cache as fallback
  event.respondWith(
    fetch(request)
      .then((networkRes) => {
        if (shouldStore(networkRes)) {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return networkRes;
      })
      .catch(() => caches.match(request).then((res) => res || Response.error()))
  );
});
