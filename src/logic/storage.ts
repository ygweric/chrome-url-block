import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const blockedEnabled = useWebExtensionStorage('webext-blocked-enabled', false)

export const blockedUrls = useWebExtensionStorage('webext-blocked-urls', [] as string[])
