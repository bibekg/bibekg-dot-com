import { Tooltip } from "./Tooltip";
import { Icon, IconButton, IconButtonProps, IconProps, Link } from "@chakra-ui/react";

export function TooltipIconButton({
  onClick,
  label,
  icon,
  href,
  openInNewTab = false,
}: {
  onClick?: () => void;
  label: string;
  icon: React.ComponentProps<typeof Icon>["as"];
  href: string;
  openInNewTab?: boolean;
}) {
  const iconButtonProps: IconButtonProps = {
    size: "xs",
    p: 1,
    bg: "bg.muted",
    // border: "1px solid",
    // borderColor: "gray.200",
  };

  const iconProps: IconProps = {
    color: "fg.muted",
    size: "md",
  };

  return (
    <Tooltip content={label}>
      <IconButton asChild {...iconButtonProps} aria-label={label} onClick={onClick}>
        <Link href={href} target={openInNewTab ? "_blank" : undefined}>
          <Icon as={icon} {...iconProps} />
        </Link>
      </IconButton>
    </Tooltip>
  );
}
