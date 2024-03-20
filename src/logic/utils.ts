export function getDomainFromUrl(url: string): string {
  if (!url) {
    return "";
  }
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/i;
  const matches = url.match(domainRegex);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return "";
}
