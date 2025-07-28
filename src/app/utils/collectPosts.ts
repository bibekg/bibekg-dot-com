import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface PostSummary {
  title: string;
  date: string;
  href: string;
}

/**
 * Collects all markdown posts under `src/app/posts` and returns
 * a list of `{title, date, href}` objects sorted by date (newest first).
 */
export async function collectPosts(): Promise<PostSummary[]> {
  const POSTS_DIR = path.join(process.cwd(), "src", "app", "posts");
  const files = await fs.readdir(POSTS_DIR);

  type FrontMatter = { title?: string; date?: string };

  const summaries: PostSummary[] = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
        const { data } = matter(raw) as { data: FrontMatter };

        const slug = file.replace(/\.md$/, "");
        return {
          title: data.title ?? slug,
          date: data.date ?? "",
          href: `/posts/${slug}`,
        } satisfies PostSummary;
      })
  );

  // Sort by date descending if dates are valid ISO strings
  summaries.sort((a, b) => {
    const aTime = Date.parse(a.date);
    const bTime = Date.parse(b.date);
    if (isNaN(aTime) || isNaN(bTime)) return 0;
    return bTime - aTime;
  });

  return summaries;
}
