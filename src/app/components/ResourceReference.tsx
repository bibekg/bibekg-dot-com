"use client";

import { Box, Flex, Heading, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { makeCleanUrl } from "../utils/makeCleanUrl";

type Props = {
  title: string;
  url?: string;
  description: React.ReactNode;
  openInNewTab?: boolean;
};

export default function ResourceReference({
  title,
  url,
  description,
  openInNewTab = url ? urlIsElsewhere(url) : false,
}: Props) {
  const innerElement = (
    <Flex wrap="wrap" gap={2}>
      <Heading as="h3" color="currentcolor" textOverflow="ellipsis" whiteSpace="nowrap">
        <Box as="span" textOverflow="ellipsis" whiteSpace="nowrap">
          {title}
        </Box>
      </Heading>
      <HStack>
        {url && (
          <Text as="span" color="fg.subtle" fontFamily="monospace" fontSize="sm">
            {makeCleanUrl(url)}
          </Text>
        )}
        {openInNewTab && (
          <Icon display="inline-block" color="fg.subtle" as={LuExternalLink} size="xs" />
        )}
      </HStack>
    </Flex>
  );

  return (
    <VStack alignItems="flex-start" gap={0} my={2}>
      {url ? (
        <Link
          maxW="fill"
          target={openInNewTab ? "_blank" : undefined}
          href={url}
          bg="transparent"
          outline="4px solid"
          mt="4px"
          color="primary"
          outlineColor="transparent"
          _hover={{ bg: "secondary/10", outlineColor: "secondary/10", color: "secondary" }}
          transition="background-color 0.3s ease-in-out, outline-color 0.3s ease-in-out, color 0.3s ease-in-out"
        >
          {innerElement}
        </Link>
      ) : (
        innerElement
      )}

      {description && <Text>{description}</Text>}
    </VStack>
  );
}

const urlIsElsewhere = (url: string) => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};
