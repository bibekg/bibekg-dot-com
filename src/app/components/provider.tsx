"use client";

import { ChakraProvider, ClientOnly } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "@/app/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ClientOnly fallback={<></>}>
        <ColorModeProvider {...props} />
      </ClientOnly>
    </ChakraProvider>
  );
}
