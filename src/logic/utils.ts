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

export function formatDate(date: Date, format: string): string {
  const padZero = (num: number) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = format
    .replace("YYYY", year.toString())
    .replace("MM", padZero(month))
    .replace("DD", padZero(day))
    .replace("HH", padZero(hours))
    .replace("mm", padZero(minutes))
    .replace("ss", padZero(seconds));

  return formattedDate;
}
