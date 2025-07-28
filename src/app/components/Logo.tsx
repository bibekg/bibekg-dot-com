import { Image } from "@chakra-ui/react";
import { LOGO_WIDTH } from "../constants";

export default function Logo() {
  return <Image width={LOGO_WIDTH} height={LOGO_WIDTH} src="/favicon.png" alt="Logo" />;
}
