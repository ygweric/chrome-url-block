import type { Tabs } from 'webextension-polyfill'
import { closeTab } from '../logic/general'
import { blockedEnabled, blockedUrls } from '../logic/storage'

browser.tabs.onUpdated.addListener((tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
  if (blockedEnabled.value && changeInfo.status === 'loading' && changeInfo.url) {
    console.log('>>>>> chrome.tabs.onUpdated.addListener url: ', tabId, changeInfo, tab)
    for (let i = 0; i < blockedUrls.value.length; ++i) {
      const url = blockedUrls.value[i]
      if (changeInfo.url?.match(url) != null) {
        closeTab(tab)
        return
      }
    }
  }
})
