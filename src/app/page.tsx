"use client";

import { Box, Heading, HStack, Link, Text } from "@chakra-ui/react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import Logo from "./components/Logo";
import ProfilePic, { picturePositioningCalc } from "./components/ProfilePic";
import ProjectReference from "./components/ProjectReference";
import { TooltipIconButton } from "./components/TooltipIconButton";
import { PROFILE_PIC_WIDTH } from "./constants";

export default function Home() {
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
        <Logo />
      </Box>

      <Box
        position="absolute"
        top={`calc(-1 * ${picturePositioningCalc})`}
        right={`calc(-1 * ${picturePositioningCalc})`}
        opacity={0.5}
        display={{ base: "none", md: "block" }}
      >
        <ProfilePic />
      </Box>

      <Box
        position="relative"
        maxWidth="650px"
        width="95%"
        mb={5}
        px={{ base: 2, md: 0 }}
        mt={{
          md: `calc(0.5 * calc(${PROFILE_PIC_WIDTH} - ${picturePositioningCalc}) - 100px);`,
        }}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1">👋🏽 Hey there!</Heading>
          <HStack>
            <TooltipIconButton
              label="LinkedIn"
              icon={LuLinkedin}
              href="https://www.linkedin.com/in/bibekghimire/"
              openInNewTab
            />
            <TooltipIconButton label="GitHub" icon={LuGithub} href="https://github.com/bibekg" />
          </HStack>
        </HStack>

        <Box my={4}>
          <Text>
            My name is Bibek Ghimire. I’m a software engineer based in the San Francisco Bay Area.
            I’m currently working on{" "}
            <Link
              href="https://newsletter.pragmaticengineer.com/i/140970283/trailhead"
              target="_blank"
            >
              internal docs
            </Link>{" "}
            and AI tools at{" "}
            <Link href="https://stripe.com" target="_blank">
              Stripe
            </Link>
            .
          </Text>
        </Box>

        <Box my={16}>
          <ProjectReference
            title="📍 Pinpoint"
            url="https://playpinpoint.app"
            description="A daily guessing game for places in your city (SF, NYC, LA, Philly)"
          />

          <ProjectReference
            title="✏️ Emlog"
            url="https://emlog.substack.com/"
            description={<Box as="span">I write here sometimes.</Box>}
          />
        </Box>
      </Box>
    </Box>
  );
}
