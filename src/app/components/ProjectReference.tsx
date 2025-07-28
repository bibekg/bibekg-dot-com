"use client";

import { Box, Heading, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

type ProjectReferenceProps = {
  title: string;
  url: string;
  description: React.ReactNode;
};

export default function ProjectReference({ title, url, description }: ProjectReferenceProps) {
  return (
    <Box my={4} display="flex" flexDirection="column" gap={2}>
      <Link
        target="_blank"
        href={url}
        bg="transparent"
        outline="4px solid"
        outlineColor="transparent"
        _hover={{ bg: "primary/20", outlineColor: "primary/20" }}
        transition="background-color 0.3s ease-in-out, outline-color 0.3s ease-in-out"
        borderRadius="md"
      >
        <HStack gap={2}>
          <Heading as="h3">{title}</Heading>
          <Text color="fg.muted">{new URL(url).hostname}</Text>
          <Icon color="fg.muted" as={LuExternalLink} />
        </HStack>
      </Link>
      <Text>{description}</Text>
    </Box>
  );
}
