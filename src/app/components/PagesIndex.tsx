import { VStack } from "@chakra-ui/react";
import { indexOfPagesIn } from "@/app/utils/indexOfPagesIn";
import ResourceReference from "./ResourceReference";
import { MarkdocParagraph } from "./MarkdocParagraph";

export default function PagesIndex({ path }: { path: string }) {
  const items = indexOfPagesIn(path);

  if (!items.length) return null;

  return (
    <VStack alignItems="flex-start" gap={0}>
      {items.map((item) => (
        <ResourceReference
          key={item.href || item.title}
          title={item.title}
          url={item.href}
          description={item.description && <MarkdocParagraph>{item.description}</MarkdocParagraph>}
        />
      ))}
    </VStack>
  );
}
