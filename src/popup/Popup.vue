<template>
  <main
    class="w-[400px] px-4 py-5 text-center text-gray-700 flex flex-col flex-justify-begin items-center gap-y-6 min-h-72"
  >
    <Logo />
    <div class="text-lg text-gray-600 font-bold -mt-4">URL Block</div>
    <div class="flex items-center justify-between w-40 pb-4 border-b">
      <div class="mr-4">On/Off</div>
      <a-switch
        v-model="blockedEnabled"
        unchecked-color="var(--color-fill-4)"
        checked-color="rgb(var(--primary-6))"
        @change="onSwitchChanged"
      >
        <template #checked> ON </template>
        <template #unchecked> OFF </template>
      </a-switch>
    </div>
    <div class="pb-4 border-b">
      <div class="flex items-center justify-between gap-x-4">
        <div><Pic></Pic>Pause for{{ pauseForDuration }}</div>
        <a-select v-model="pauseForDuration" :style="{ width: '150px' }">
          <a-option :value="0.05">3 second</a-option>
          <a-option :value="1">1 minute</a-option>
          <a-option :value="10">10 minutes</a-option>
          <a-option :value="30">30 minutes</a-option>
          <a-option :value="60">1 hour</a-option>
          <a-option :value="240">4 hour</a-option>
          <a-option :value="480">8 hour</a-option>
        </a-select>
        <a-button type="primary" @click="pauseForAWhile">Pause</a-button>
      </div>

      <div v-if="pauseUntilTime" class="mt-2">
        <IconClockCircle />
        <span>Will turn on at</span>
        <span class="text-gray-950 font-semibold ml-1 mr-1">
          {{ formatDate(new Date(pauseUntilTime), "MM-DD HH:mm:ss") }}</span
        >
        <span class="ml-1 mr-1">/</span>
        <span>in</span>
        <span class="text-gray-950 font-semibold ml-1 mr-1">
          {{ Math.round((pauseUntilTime - Date.now()) / (60 * 1000)) }}
        </span>
        <span>minutes</span>
      </div>
    </div>

    <div class="w-40 pb-4 border-b">
      <a-button
        status="warning"
        type="primary"
        long
        :disabled="!isHttpUrl"
        @click="blockByDomain"
      >
        <template #icon>
          <IconCompass />
        </template>
        Block By Domain
      </a-button>
      <div v-if="isHttpUrl" class="mt-1 text-gray-600 underline">
        {{ domain }}
      </div>
    </div>

    <div class="w-40">
      <a-button
        status="warning"
        type="outline"
        long
        :disabled="!isHttpUrl"
        @click="blockByAddress"
      >
        <template #icon>
          <IconComputer />
        </template>
        Block By Address
      </a-button>
      <a-tooltip v-if="isHttpUrl" :content="url">
        <div
          class="mt-1 text-gray-600 underline w-40 text-nowrap text-ellipsis overflow-hidden"
        >
          {{ url }}
        </div>
      </a-tooltip>
    </div>

    <div class="w-40">
      <a-button long @click="openOptionsPage">
        <template #icon>
          <IconSettings />
        </template>
        Setting
      </a-button>
    </div>
  </main>
</template>
<script setup lang="ts">
/* global browser */
import {
  IconCompass,
  IconComputer,
  IconSettings,
  IconClockCircle,
} from "@arco-design/web-vue/es/icon";
import { computedAsync } from "@vueuse/core";
import {
  addBlockDomain,
  addBlockURL,
  closeTab,
  turnOnIfOnTime,
} from "~/logic/general";
import { blockedEnabled, pauseUntilTime } from "~/logic/storage";
import { getDomainFromUrl, formatDate } from "~/logic/utils";

const pauseForDuration = ref(10);

function openOptionsPage() {
  browser.runtime.openOptionsPage();
}

const pauseForAWhile = () => {
  pauseUntilTime.value = Date.now() + pauseForDuration.value * 60 * 1000;
  blockedEnabled.value = false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSwitchChanged = (value: string | number | boolean, ev: Event) => {
  console.log(blockedEnabled.value);

  // blockedEnabled.value = value as boolean
  if (!blockedEnabled.value) {
    // 如果关闭，之前的暂时关闭即使不再需要
    pauseUntilTime.value = 0;
  }
};

const url = computedAsync(async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  return currentTab.url;
});
const isHttpUrl = computedAsync(async () => {
  return url.value?.startsWith("http");
});

const domain = computedAsync(async () => {
  return getDomainFromUrl(url.value || "");
});

async function blockByAddress() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  const url = currentTab.url;
  console.log(url);
  url && addBlockURL(url);
  blockedEnabled.value && closeTab(currentTab);
}
async function blockByDomain() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  console.log(domain);
  domain && addBlockDomain(domain.value);
  blockedEnabled.value && closeTab(currentTab);
}

onMounted(() => {
  // 必须延时，否则useWebExtensionStorage还要准备一会
  setTimeout(() => {
    turnOnIfOnTime();
  }, 1000);
});
</script>
