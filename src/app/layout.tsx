import { Provider } from "@/app/components/provider";
import type { Metadata, Viewport } from "next";
import { Lora, Nunito, Sono, Special_Elite } from "next/font/google";
import "./globals.css";

const headingFont = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const monospaceFont = Sono({
  variable: "--font-monospace",
  subsets: ["latin"],
  weight: "400",
});

const typewriterFont = Special_Elite({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: "400",
});

const FONTS = [headingFont, bodyFont, monospaceFont, typewriterFont];

export const metadata: Metadata = {
  title: "Bibek Ghimire",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/ios-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --font-heading: ${headingFont.style.fontFamily};
            --font-body: ${bodyFont.style.fontFamily};
            --font-monospace: ${monospaceFont.style.fontFamily};
            --font-typewriter: ${typewriterFont.style.fontFamily};
        `}</style>
      </head>
      <body className={FONTS.map((font) => font.variable).join(" ")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
