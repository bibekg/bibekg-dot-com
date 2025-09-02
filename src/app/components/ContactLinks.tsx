"use client";

import { HStack } from "@chakra-ui/react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { TooltipIconButton } from "./TooltipIconButton";

export default function ContactLinks() {
  return (
    <HStack my={6}>
      <TooltipIconButton
        label="LinkedIn"
        iconElement={<LuLinkedin />}
        href="https://www.linkedin.com/in/bibekg/"
        openInNewTab
      />
      <TooltipIconButton
        label="GitHub"
        iconElement={<LuGithub />}
        href="https://github.com/bibekg"
      />
    </HStack>
  );
}
