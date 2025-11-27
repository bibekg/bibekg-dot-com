"use client";
import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";

export type MarkdocHeadingProps = {
  level?: number;
  id?: string;
  children?: React.ReactNode;
};

type ValidHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const MarkdocHeading: React.FC<MarkdocHeadingProps> = ({ level = 2, id, children }) => {
  const normalizedLevel: ValidHeadingLevel = Math.min(6, Math.max(1, level)) as ValidHeadingLevel;

  if (normalizedLevel === 1) {
    return (
      <ChakraHeading as="h1" fontSize="4xl" fontWeight="bold" color="primary" id={id} mb={4} mt={8}>
        {children}
      </ChakraHeading>
    );
  }
  if (normalizedLevel === 2) {
    return (
      <ChakraHeading as="h2" size="xl" my={4} mt={8} textTransform="uppercase" color="fg" id={id}>
        {children}
      </ChakraHeading>
    );
  }

  const asTag = `h${normalizedLevel}` as `h${typeof normalizedLevel}`;
  return (
    <ChakraHeading as={asTag} id={id} fontSize="xl" mt={8}>
      {children}
    </ChakraHeading>
  );
};

export default MarkdocHeading;
