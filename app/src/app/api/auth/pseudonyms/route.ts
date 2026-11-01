import { NextResponse } from "next/server";
import { generateSuggestions } from "@/lib/pseudonyms";

export async function GET() {
  const suggestions = generateSuggestions(5);
  return NextResponse.json({ suggestions });
}

