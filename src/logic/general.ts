import type { Tabs } from "webextension-polyfill";
import {
  blockedDomains,
  blockedEnabled,
  blockedRegexes,
  blockedUrls,
  pauseUntilTime,
} from "./storage";

export async function closeTab(tab: Tabs.Tab) {
  await browser.tabs.remove([tab.id!]);
  if (browser.runtime.lastError) console.log(browser.runtime.lastError.message);
  else console.log("close tab success");
}

export function addBlockURL(url: string) {
  if (!blockedUrls.value.includes(url)) blockedUrls.value.push(url);
}

export function removeBlockURL(url: string) {
  if (blockedUrls.value.includes(url))
    blockedUrls.value = blockedUrls.value.filter((item) => item !== url);
}

export function addBlockDomain(domain: string) {
  if (!blockedDomains.value.includes(domain)) blockedDomains.value.push(domain);
}

export function removeBlockDomain(domain: string) {
  if (blockedDomains.value.includes(domain))
    blockedDomains.value = blockedDomains.value.filter(
      (item) => item !== domain
    );
}

export function addBlockRegex(regex: string) {
  if (!blockedRegexes.value.includes(regex)) blockedRegexes.value.push(regex);
}

export function removeBlockRegex(regex: string) {
  if (blockedRegexes.value.includes(regex))
    blockedRegexes.value = blockedRegexes.value.filter(
      (item) => item !== regex
    );
}

/**
 * 判断是否到了turn on的时候
 * 如果时间到了，则
 *  1. 清空时间
 *  2. turn on
 *
 * ?? pauseUntilTime.value  在popup中一直是0，为啥
 */
export const turnOnIfOnTime = () => {
  if (!pauseUntilTime.value || Date.now() < pauseUntilTime.value) {
    return;
  }

  pauseUntilTime.value = 0;
  blockedEnabled.value = true;
};
