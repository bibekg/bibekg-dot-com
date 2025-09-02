export function makeCleanUrl(url: string) {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname.replace("www.", "");
  } catch (error) {
    return url;
  }
}
