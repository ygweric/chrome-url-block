<template>
  <div
    class="rr-fixed rr-right-48 rr-bottom-0 rr-m-5 rr-z-100 rr-flex rr-items-end rr-font-sans rr-select-none rr-leading-1em"
  >
    <div
      class="rr-bg-yellow-700 rr-text-gray-800 rr-rounded-lg shadow rr-w-max rr-h-min"
      transition="rr-opacity rr-duration-300"
      :class="show ? 'rr-opacity-100' : 'rr-opacity-20'"
    >
      <h1 class="rr-text-lg">Vitesse WebExt</h1>
    </div>
    <a-divider />
    <a-button type="primary" @click="toggle()"> button </a-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";

const [show, toggle] = useToggle(false);
</script>
