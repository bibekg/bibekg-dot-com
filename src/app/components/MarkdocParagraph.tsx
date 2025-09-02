import { Text } from "@chakra-ui/react";

export function MarkdocParagraph({ children }: { children: React.ReactNode }) {
  return (
    <Text as="p" my={2}>
      {children}
    </Text>
  );
}
