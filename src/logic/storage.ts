import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const blockedEnabled = useWebExtensionStorage('enable', false)

export const blockedUrls = useWebExtensionStorage('urls', [] as string[])
