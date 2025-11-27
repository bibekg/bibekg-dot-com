import { List } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export function MarkdocList({ children }: Props) {
  return (
    <List.Root marginLeft={8} gap={2}>
      {children}
    </List.Root>
  );
}
