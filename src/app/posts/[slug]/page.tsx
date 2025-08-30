import fs from "fs/promises";
import path from "path";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import matter from "gray-matter";

type Props = {
  params: Promise<{ slug: string }>;
};

const POSTS_DIR = path.join(process.cwd(), "src", "app", "posts");

export async function generateStaticParams() {
  const files = await fs.readdir(POSTS_DIR);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);

  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast);
  const reactContent = Markdoc.renderers.react(transformed, React);

  return (
    <article style={{ maxWidth: 750, margin: "0 auto", padding: "2rem" }}>
      {data.title && <h1 style={{ marginBottom: "1.5rem", fontSize: "2rem" }}>{data.title}</h1>}
      {reactContent}
    </article>
  );
}
