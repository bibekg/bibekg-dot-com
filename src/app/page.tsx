import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
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
        maxWidth="55em"
        width="95%"
        mb={5}
        px={{ base: 2, md: 0 }}
        mt={{
          md: `calc(0.5 * calc(${PROFILE_PIC_WIDTH} - ${picturePositioningCalc}) - 100px);`,
        }}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize="4xl" fontWeight="bold" color="primary">
            👋🏽 Hey there!
          </Heading>
          <HStack>
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
        </HStack>

        <Box my={4}>
          <Text>
            {`My name is Bibek Ghimire. I’m a software engineer based in the San Francisco Bay Area.
            I’m currently working on `}
            <Link
              href="https://www.writethedocs.org/videos/portland/2024/sociological-considerations-in-designing-an-internal-documentation-platform-alistair-gray/"
              target="_blank"
            >
              internal docs
            </Link>
            {` and AI tools at `}
            <Link href="https://stripe.com" target="_blank">
              Stripe
            </Link>
            .
          </Text>
        </Box>

        <Box my={8}>
          <Heading as="h2" size="sm" mb={4} textTransform="uppercase" color="fg.muted">
            🪴 hobbies & curiosities
          </Heading>

          <VStack gap={8} alignItems="flex-start">
            <ProjectReference
              title="📍 Pinpoint"
              url="https://playpinpoint.app"
              description="A daily guessing game for places in your city (SF, NYC, LA, Philly)."
            />

            <ProjectReference
              title="🖊️ Imperfectionist"
              url="https://imperfectionist.substack.com/"
              description="I write here sometimes."
            />

            <ProjectReference
              title="✏️ Emlog"
              url="https://emlog.substack.com/"
              description={
                <Box as="span">
                  I also write here sometimes, along with my friend{" "}
                  <Link href="https://matv.vercel.app/" target="_blank">
                    Mat
                  </Link>
                  .
                </Box>
              }
            />
          </VStack>
        </Box>

        {/* Blog posts list */}
        {/* {posts.length > 0 && (
          <Box mt={20} width="100%">
            <Heading as="h2" size="lg" mb={4}>
              Writing
            </Heading>
            <VStack alignItems="flex-start" gap={2}>
              {posts.map((post) => (
                <Link key={post.href} href={post.href} fontWeight="medium">
                  <Text color="primary" fontWeight="bold" fontSize="lg">
                    {post.title}
                  </Text>
                  {post.date && (
                    <Text as="span" color="gray.500" fontSize="sm" ml={2}>
                      {new Date(post.date).toLocaleDateString()}
                    </Text>
                  )}
                </Link>
              ))}
            </VStack>
          </Box>
        )} */}
      </Box>
    </Box>
  );
}
