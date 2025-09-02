import { Link } from "@chakra-ui/react";

export function MarkdocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      display="inline"
      target="_blank"
      color="primary"
      transition="box-shadow 0.3s ease-in-out, color 0.3s ease-in-out"
      boxShadow="inset 0 -2px 0 0 transparent"
      borderRadius="0"
      fontWeight={600}
      _hover={{
        boxShadow: "inset 0 -2px 0 0 currentColor",
        color: "secondary",
      }}
    >
      {children}
    </Link>
  );
}
