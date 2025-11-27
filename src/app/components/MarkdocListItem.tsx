import { List } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export function MarkdocListItem({ children }: Props) {
  return <List.Item>{children}</List.Item>;
}
