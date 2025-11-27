import { Blockquote } from "@chakra-ui/react";

export function MarkdocBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <Blockquote.Root my={1}>
      <Blockquote.Content pl={4} color="fg.muted" css={{ "& > p": { marginY: 1 } }}>
        {children}
      </Blockquote.Content>
    </Blockquote.Root>
  );
}
