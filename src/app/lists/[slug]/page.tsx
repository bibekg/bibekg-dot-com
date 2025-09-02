import StandardLayout from "@/app/components/StandardLayout";
import { renderMarkdocToReact } from "@/app/utils/markdoc";
import { Heading, Text, VStack } from "@chakra-ui/react";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

type Props = {
  params: Promise<{ slug: string }>;
};

const LISTS_DIR = path.join(process.cwd(), "src", "app", "lists");

export async function generateStaticParams() {
  const files = await fs.readdir(LISTS_DIR);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.(md|mdx)$/, "") }));
}

export default async function ListPage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(LISTS_DIR, `${slug}.md`);

  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);

  const reactContent = renderMarkdocToReact(content);

  return (
    <StandardLayout>
      <article>
        {data.title && (
          <VStack mb={8} alignItems="flex-start" gap={4}>
            <Heading as="h1" fontSize="2rem">
              {data.title}
            </Heading>
            <Text color="fg.muted" fontSize="md">
              {data.description}
            </Text>
          </VStack>
        )}
        {reactContent}
      </article>
    </StandardLayout>
  );
}
