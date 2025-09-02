"use client";
import { Box, Link } from "@chakra-ui/react";
import Logo from "./Logo";
import ProfilePic, { picturePositioningCalc } from "./ProfilePic";
import { PROFILE_PIC_WIDTH } from "../constants";
import React from "react";
import { Tooltip } from "./Tooltip";

type StandardLayoutProps = {
  children: React.ReactNode;
  showProfilePic?: boolean;
};

export default function StandardLayout({ children, showProfilePic = false }: StandardLayoutProps) {
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDocumentClick() {}
    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, []);

  return (
    <Box
      py={{ base: 10, md: 20 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        top="20px"
        left="20px"
        alignItems="center"
        justifyContent="flex-start"
        display={{ base: "none", md: "block" }}
      >
        <Tooltip content={window.location.pathname !== "/" ? "〱 Return to home page" : "Home"}>
          <Link href="/">
            <Logo />
          </Link>
        </Tooltip>
      </Box>

      {showProfilePic && (
        <Box
          position="absolute"
          top={`calc(-1 * ${picturePositioningCalc})`}
          right={`calc(-1 * ${picturePositioningCalc})`}
          opacity={0.5}
          display={{ base: "none", md: "block" }}
        >
          <ProfilePic />
        </Box>
      )}

      <Box
        position="relative"
        maxWidth="40em"
        width="95%"
        mb={5}
        px={{ base: 2, md: 0 }}
        mt={{
          md: showProfilePic
            ? `calc(0.5 * calc(${PROFILE_PIC_WIDTH} - ${picturePositioningCalc}) - 100px);`
            : undefined,
        }}
      >
        <Box ref={menuRef} />
        {children}
      </Box>
    </Box>
  );
}
