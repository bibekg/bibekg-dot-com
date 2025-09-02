"use client";

import { Tooltip } from "./Tooltip";
import { IconButton, IconButtonProps, Link } from "@chakra-ui/react";
import * as React from "react";

export function TooltipIconButton({
  onClick,
  label,
  iconElement,
  href,
  openInNewTab = false,
}: {
  onClick?: () => void;
  label: string;
  iconElement: React.ReactElement;
  href: string;
  openInNewTab?: boolean;
}) {
  const iconButtonProps: IconButtonProps = {
    size: "xs",
    p: 1,
    bg: "bg.muted",
  };

  return (
    <Tooltip content={label}>
      <IconButton asChild {...iconButtonProps} aria-label={label} onClick={onClick}>
        <Link href={href} target={openInNewTab ? "_blank" : undefined}>
          {iconElement}
        </Link>
      </IconButton>
    </Tooltip>
  );
}
