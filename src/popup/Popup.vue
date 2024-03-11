<script setup lang="ts">
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700 flex flex-col flex-justify-begin flex-items-center gap-y-4  min-h-60">
    <div class="flex flex-items-center flex-justify-between w-40">
      <div class="mr-4">
        On/Off
      </div>
      <a-switch unchecked-color="var(--color-fill-4)" checked-color="rgb(var(--primary-6))">
        <template #checked>
          ON
        </template>
        <template #unchecked>
          OFF
        </template>
      </a-switch>
    </div>

    <div class="w-40">
      <a-button type="primary" long class="">
        Block Current URL
      </a-button>
    </div>

    <div class="w-40">
      <a-button long @click="openOptionsPage">
        Open Options
      </a-button>
    </div>
  </main>
</template>
