"use client";
import { Blockquote, Box, Flex, Float, Link, Text } from "@chakra-ui/react";
import React from "react";
import { makeCleanUrl } from "../utils/makeCleanUrl";

export type MarkdocQuoteProps = {
  author?: string;
  url?: string;
  myThoughts?: string;
  children?: React.ReactNode;
};

export function MarkdocQuote({ author, url, myThoughts, children }: MarkdocQuoteProps) {
  const authorElement = (
    <Box as="span" fontStyle="italic" fontWeight="bold">
      – <cite>{author}</cite>
    </Box>
  );
  return (
    <Blockquote.Root my={8} pl={4} variant="plain">
      <Float placement="top-start" offsetY="2">
        <Blockquote.Icon color="primary" />
      </Float>
      <Blockquote.Content
        cite={author}
        color="fg.muted"
        fontStyle="italic"
        fontWeight="bold"
        fontSize="md"
      >
        {children}
      </Blockquote.Content>
      <Blockquote.Caption>
        {url ? (
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <Flex wrap="wrap" gap={2} color="primary" fontSize="md">
              {authorElement}
              <Box as="span" color="primary/40" fontFamily="monospace" fontSize="sm">
                {makeCleanUrl(url)}
              </Box>
            </Flex>
          </Link>
        ) : (
          authorElement
        )}
        {myThoughts && (
          <Text opacity="0.6" fontSize="sm" mt={2}>
            {" "}
            {myThoughts}
          </Text>
        )}
      </Blockquote.Caption>
    </Blockquote.Root>
  );
}

export default MarkdocQuote;
