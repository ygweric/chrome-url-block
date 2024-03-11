import type { Tabs } from 'webextension-polyfill'
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

const blockedUrls = useWebExtensionStorage('webext-blocked-urls', [] as string[])

export async function closeTab(tab: Tabs.Tab) {
  const reuslt = await browser.tabs.remove([tab.id!])
  if (browser.runtime.lastError)
    console.log(browser.runtime.lastError.message)
  else
    console.log(reuslt)
}

export function insertURL(url: string) {
  blockedUrls.value.push(url)
}

export function removeURL(url: string) {
  if (blockedUrls.value.includes(url))
    blockedUrls.value = blockedUrls.value.filter(item => item !== url)
}
