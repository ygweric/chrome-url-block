import type { Tabs } from 'webextension-polyfill'
import { blockedUrls } from './storage'

export async function closeTab(tab: Tabs.Tab) {
  await browser.tabs.remove([tab.id!])
  if (browser.runtime.lastError)
    console.log(browser.runtime.lastError.message)
  else
    console.log('close tab success')
}

export function addBlockURL(url: string) {
  if (!blockedUrls.value.includes(url))
    blockedUrls.value.push(url)
}

export function removeBlockURL(url: string) {
  if (blockedUrls.value.includes(url))
    blockedUrls.value = blockedUrls.value.filter(item => item !== url)
}
