import StandardLayout from "./components/StandardLayout";
import { renderMarkdocToReact } from "./utils/markdoc";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

export default async function Home() {
  const filePath = path.join(process.cwd(), "src", "app", "home.md");
  const raw = await fs.readFile(filePath, "utf8");
  const { content } = matter(raw);
  const reactContent = renderMarkdocToReact(content);

  return <StandardLayout showProfilePic>{reactContent}</StandardLayout>;
}
