import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type IndexedPageLink = {
  title: string;
  description?: string;
  href: string;
};

/**
 * Synchronously index markdown files in a directory under `src/app` and
 * produce `{ title, description, href }` links derived from frontmatter and path.
 *
 * Example:
 *  indexOfPagesIn("src/app/lists") -> [{ title, description, href: "/lists/products" }, ...]
 */
export function indexOfPagesIn(relativeDirPath: string): IndexedPageLink[] {
  const appDir = path.join(process.cwd(), "src", "app");
  const absoluteDir = path.isAbsolute(relativeDirPath)
    ? relativeDirPath
    : path.join(process.cwd(), relativeDirPath);

  if (!absoluteDir.startsWith(appDir)) {
    throw new Error(
      `indexOfPagesIn must point to a directory under src/app. Received: ${relativeDirPath}`,
    );
  }

  if (!fs.existsSync(absoluteDir)) return [];

  const routeBase =
    "/" + path.relative(appDir, absoluteDir).split(path.sep).filter(Boolean).join("/");

  const files = fs.readdirSync(absoluteDir, { withFileTypes: true });

  const links: IndexedPageLink[] = files
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => {
      const filePath = path.join(absoluteDir, dirent.name);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw) as {
        data: { title?: string; description?: string };
      };

      const slug = dirent.name.replace(/\.(md|mdx)$/i, "");
      const href = `${routeBase}/${slug}`;

      return {
        title: data.title ?? slug,
        description: data.description,
        href,
      } satisfies IndexedPageLink;
    });

  return links;
}
