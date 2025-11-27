"use client";

import { Box, Heading, Icon, Image, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { LuExternalLink } from "react-icons/lu";
import { makeCleanUrl } from "../utils/makeCleanUrl";
import { useResourceFavicon } from "../utils/useResourceFavicon";

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
  const { src: faviconSrc, onError: onFaviconError } = useResourceFavicon(url);

  const innerElement = (
    <Box as="span" whiteSpace="normal">
      {!!faviconSrc && (
        <Image
          src={faviconSrc}
          alt=""
          boxSize="24px"
          borderRadius="3px"
          onError={onFaviconError}
          display="inline-block"
          verticalAlign="text-bottom"
        />
      )}
      <Heading as="h3" color="currentcolor" display="inline" ml={faviconSrc ? 2 : 0}>
        {title}
      </Heading>

      {url && (
        <Text
          className="url"
          as="span"
          color="fg.subtle"
          fontFamily="monospace"
          fontSize="sm"
          ml={2}
          css={{
            transition: "color 0.3s ease-in-out",
            ".resource-reference:hover &": {
              color: "secondary/50",
            },
          }}
        >
          {makeCleanUrl(url)}
        </Text>
      )}
      {openInNewTab && (
        <Icon display="inline-block" color="fg.subtle" as={LuExternalLink} size="xs" ml={2} />
      )}
    </Box>
  );

  return (
    <VStack alignItems="flex-start" gap={0} my={4}>
      {url ? (
        <Link
          maxW="fill"
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          href={url}
          bg="transparent"
          outline="4px solid"
          mt="4px"
          color="primary"
          outlineColor="transparent"
          className="resource-reference"
          _hover={{
            bg: "secondary/10",
            outlineColor: "secondary/10",
            color: "secondary",
          }}
          transition="background-color 0.3s ease-in-out, outline-color 0.3s ease-in-out, color 0.3s ease-in-out"
        >
          {innerElement}
        </Link>
      ) : (
        innerElement
      )}

      <Box
        as="span"
        css={{ "& > *:first-child": { marginTop: 1 }, "& > *:last-child": { marginBottom: 1 } }}
      >
        {description}
      </Box>
    </VStack>
  );
}

const urlIsElsewhere = (url: string) => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname !== window.location.hostname;
  } catch {
    return false;
  }
};
