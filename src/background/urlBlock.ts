import type { Tabs } from "webextension-polyfill";
import { getDomainFromUrl } from "~/logic/utils";
import { closeTab, turnOnIfOnTime } from "../logic/general";
import { blockedDomains, blockedEnabled, blockedUrls } from "../logic/storage";

const blockUrl = (
  tabId: number,
  changeInfo: Tabs.OnUpdatedChangeInfoType,
  tab: Tabs.Tab
) => {
  console.log(
    ">>>>> chrome.tabs.onUpdated.addListener url: ",
    tabId,
    changeInfo,
    tab
  );
  if (blockedUrls.value.includes(changeInfo.url || "")) {
    closeTab(tab);
    return;
  }

  const domain = getDomainFromUrl(changeInfo.url || "");
  if (blockedDomains.value.includes(domain)) {
    closeTab(tab);
  }
};

browser.tabs.onUpdated.addListener(
  (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
    turnOnIfOnTime();

    if (
      blockedEnabled.value &&
      changeInfo.status === "loading" &&
      changeInfo.url
    ) {
      blockUrl(tabId, changeInfo, tab);
    }
  }
);
