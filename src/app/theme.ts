import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#4650DF" },
        secondary: { value: "#FA8072" },
        backgroundLight: { value: "#FBF6F0" },
        backgroundDark: { value: "#181818" },
      },
      fonts: {
        heading: { value: "var(--font-heading), serif" },
        body: { value: "var(--font-body), sans-serif" },
        mono: { value: "var(--font-monospace), monospace" },
        typewriter: { value: "var(--font-typewriter), monospace" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
