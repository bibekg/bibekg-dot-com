export function makeCleanUrl(url: string) {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname == window.location.hostname
      ? urlObject.pathname
      : urlObject.hostname.replace("www.", "");
  } catch (error) {
    return url;
  }
}
