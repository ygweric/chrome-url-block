<template>
  <main
    class="w-[300px] px-4 py-5 text-center text-gray-700 flex flex-col flex-justify-begin items-center gap-y-6 min-h-72"
  >
    <Logo />
    <div class="text-lg text-gray-600 font-bold -mt-4">URL Block</div>
    <div class="flex items-center justify-between w-40">
      <div class="mr-4">On/Off</div>
      <a-switch
        v-model="blockedEnabled"
        unchecked-color="var(--color-fill-4)"
        checked-color="rgb(var(--primary-6))"
      >
        <template #checked> ON </template>
        <template #unchecked> OFF </template>
      </a-switch>
    </div>

    <div class="w-40">
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
      <a-divider class="mb-0"></a-divider>
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
  IconClose,
  IconCompass,
  IconComputer,
  IconEyeInvisible,
  IconSettings,
} from "@arco-design/web-vue/es/icon";
import { computedAsync } from "@vueuse/core";
import { blockedEnabled } from "~/logic/storage";
import { addBlockDomain, addBlockURL, closeTab } from "~/logic/general";
import { getDomainFromUrl } from "~/logic/utils";

function openOptionsPage() {
  browser.runtime.openOptionsPage();
}

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
</script>
