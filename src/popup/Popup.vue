<script setup lang="ts">
import { IconEyeInvisible, IconSettings } from '@arco-design/web-vue/es/icon'
import { blockedEnabled } from '~/logic'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

// blockedUrls
// blockedEnabled
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700 flex flex-col flex-justify-begin items-center gap-y-6  min-h-72">
    <Logo />
    <div class="font-size-6 color-red-600 font-bold -mt-4">
      URL Block
    </div>
    <div class="flex items-center justify-between w-40">
      <div class="mr-4">
        On/Off
      </div>
      <a-switch v-model="blockedEnabled" unchecked-color="var(--color-fill-4)" checked-color="rgb(var(--primary-6))">
        <template #checked>
          ON
        </template>
        <template #unchecked>
          OFF
        </template>
      </a-switch>
    </div>

    <div class="w-40">
      <a-button status="warning" type="primary" long>
        <template #icon>
          <IconEyeInvisible />
        </template>
        Block Current URL
      </a-button>
    </div>

    <div class="w-40">
      <a-button long @click="openOptionsPage">
        <template #icon>
          <IconSettings />
        </template>
        Open Options
      </a-button>
    </div>
  </main>
</template>
