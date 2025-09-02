import React from "react";

export function useResourceFavicon(url?: string) {
  const [hideFavicon, setHideFavicon] = React.useState(false);
  const [faviconIndex, setFaviconIndex] = React.useState(0);

  const sources = React.useMemo(() => {
    if (!url) return null;
    try {
      const urlObject = new URL(url);
      const origin = `${urlObject.protocol}//${urlObject.hostname}`;
      const hostname = urlObject.hostname;
      return [
        // Higher-quality usually
        `${origin}/favicon.png`,
        `${origin}/favicon.ico`,
        `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
      ];
    } catch {
      return null;
    }
  }, [url]);

  React.useEffect(() => {
    setHideFavicon(false);
    setFaviconIndex(0);
  }, [url]);

  const src = React.useMemo(() => {
    if (!sources || hideFavicon) return null;
    return sources[faviconIndex] ?? null;
  }, [sources, hideFavicon, faviconIndex]);

  const onError = React.useCallback(() => {
    if (!sources) return setHideFavicon(true);
    if (faviconIndex < sources.length - 1) {
      setFaviconIndex((idx) => idx + 1);
    } else {
      setHideFavicon(true);
    }
  }, [sources, faviconIndex]);

  return { src, onError } as const;
}
