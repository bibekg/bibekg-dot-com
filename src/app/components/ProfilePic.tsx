import { PROFILE_PIC_WIDTH } from "../constants";
import { Image } from "@chakra-ui/react";

// To position a circle in a corner so that it's tucked in just right :)
export const picturePositioningCalc = `calc(
  calc(${PROFILE_PIC_WIDTH} - calc(${PROFILE_PIC_WIDTH} / ${Math.sqrt(2)})) / 2
)`;

export default function ProfilePic() {
  return (
    <Image
      width={PROFILE_PIC_WIDTH}
      height={PROFILE_PIC_WIDTH}
      borderRadius="full"
      src="/bibek.jpeg"
      alt="Profile picture"
    />
  );
}
