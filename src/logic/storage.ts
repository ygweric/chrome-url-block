import { useWebExtensionStorage } from "~/composables/useWebExtensionStorage";

export const blockedEnabled = useWebExtensionStorage(
  "enable",
  false as boolean
);

export const blockedUrls = useWebExtensionStorage("urls", [] as string[]);

export const blockedDomains = useWebExtensionStorage(
  "block_domains",
  [] as string[]
);

export const blockedRegexes = useWebExtensionStorage(
  "block_regexes",
  [] as string[]
);

/**
 * 暂停直到x时间
 * 手动关闭时候失效
 * 多次设置后覆盖
 */
export const pauseUntilTime = useWebExtensionStorage(
  "pause_until_time",
  0 as number
);
