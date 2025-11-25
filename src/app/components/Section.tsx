import { Box } from "@chakra-ui/react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <Box as="section" my={12} gap={0}>
      {children}
    </Box>
  );
}
