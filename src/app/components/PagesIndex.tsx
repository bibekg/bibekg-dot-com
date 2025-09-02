import { VStack } from "@chakra-ui/react";
import { indexOfPagesIn } from "@/app/utils/indexOfPagesIn";
import ResourceReference from "./ResourceReference";

export default function PagesIndex({ path }: { path: string }) {
  const items = indexOfPagesIn(path);

  if (!items.length) return null;

  return (
    <VStack alignItems="flex-start">
      {items.map((item) => (
        <ResourceReference
          key={item.href}
          title={item.title}
          url={item.href}
          description={item.description}
        />
      ))}
    </VStack>
  );
}
