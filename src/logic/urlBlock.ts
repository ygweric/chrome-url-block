import type { Tabs } from 'webextension-polyfill'
import { closeTab } from './general'
import { blockedEnabled, blockedUrls } from './storage'

browser.tabs.onUpdated.addListener((tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
  console.log(`>>>>> chrome.tabs.onUpdated.addListener url: ${changeInfo.url}`)

  if (blockedEnabled.value) {
    for (let i = 0; i < blockedUrls.value.length; ++i) {
      const url = blockedUrls.value[i]
      if (tab.url?.match(url) != null) {
        closeTab(tab)
        return
      }
    }
  }
})
