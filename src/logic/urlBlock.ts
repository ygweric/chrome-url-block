import type { Tabs } from 'webextension-polyfill'
import { closeTab } from './general'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const blockedUrls = useWebExtensionStorage('webext-blocked-urls', [] as string[])
export const blockedEnabled = useWebExtensionStorage('webext-blocked-enabled', false)

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
