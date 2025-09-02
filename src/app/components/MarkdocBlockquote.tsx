import { Blockquote } from "@chakra-ui/react";

export function MarkdocBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <Blockquote.Root my={2}>
      <Blockquote.Content pl={4} color="fg.muted">
        {children}
      </Blockquote.Content>
    </Blockquote.Root>
  );
}
