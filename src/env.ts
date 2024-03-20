const forbiddenProtocols = [
  "chrome-extension://",
  "chrome-search://",
  "chrome://",
  "devtools://",
  "edge://",
  "https://chrome.google.com/webstore",
];

export function isForbiddenUrl(url: string): boolean {
  return forbiddenProtocols.some((protocol) => url.startsWith(protocol));
}

let navigator: any;
export const isFirefox = navigator?.userAgent?.includes("Firefox");

/* 配置插件包含的内容 */
export const hasPopupPage = true;
export const hasOptionPage = true;
export const hasBackgroundScript = true;
export const hasContentScript = false;
