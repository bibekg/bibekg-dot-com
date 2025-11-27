import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "src", "app", "posts");

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

 export async function GET(_req: Request, context: { params: Record<string, string | string[]> }) {
  try {
    const slugParam = context.params.slug;
    const assetParam = context.params.asset;

    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const segments = Array.isArray(assetParam)
      ? assetParam
      : typeof assetParam === "string"
      ? [assetParam]
      : [];

    // Normalize and protect against traversal
    const cleaned = segments.map((s) => decodeURIComponent(s)).filter(Boolean);
    if (cleaned.some((s) => s === "..")) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Many markdowns might reference "how-i-built-xyz/<file>" even when URL already contains the slug.
    // If the first asset segment duplicates the slug, drop the duplicate.
    const effectiveSegments =
      cleaned.length > 0 && cleaned[0] === slug ? cleaned.slice(1) : cleaned;

    const relativePath = path.join(slug, ...effectiveSegments);
    const absolutePath = path.resolve(POSTS_DIR, relativePath);

    if (!absolutePath.startsWith(POSTS_DIR)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const file = await fs.readFile(absolutePath);
    const mime = getMimeType(absolutePath);

    return new NextResponse(file as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("ENOENT")) {
      return new NextResponse("Not found", { status: 404 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
