"use client";

import { Heading, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

type ProjectReferenceProps = {
  title: string;
  url: string;
  description: React.ReactNode;
};

export default function ProjectReference({ title, url, description }: ProjectReferenceProps) {
  return (
    <VStack gap={2} alignItems="flex-start">
      <Link
        target="_blank"
        href={url}
        bg="transparent"
        outline="8px solid"
        outlineColor="transparent"
        _hover={{ bg: "primary/20", outlineColor: "primary/20" }}
        transition="background-color 0.3s ease-in-out, outline-color 0.3s ease-in-out"
        borderRadius="md"
      >
        <HStack gap={2} alignItems="baseline">
          <Heading as="h3" color="primary">
            {title}
          </Heading>
          <Text color="fg.muted" fontFamily="monospace" fontSize="sm">
            {new URL(url).hostname}
          </Text>
          <Icon color="fg.muted" as={LuExternalLink} size="xs" />
        </HStack>
      </Link>
      <Text>{description}</Text>
    </VStack>
  );
}
