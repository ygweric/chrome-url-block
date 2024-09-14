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
    <a-button type="primary" @click="convertRelativeImgToAbsolute()">
      relative image url to absolute
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";

import showdown from "../showdown.js";
import $ from "jquery";

const [show, toggle] = useToggle(false);

var converter =  new showdown.Converter({
  extensions: ['prettify', 'tasklist', 'footnote'],
  tables: true
});


const convertRelativeImgToAbsolute = () => {
  console.log("convertRelativeImgToAbsolute");
  // 获取当前页面的所有 <img> 标签
  const images = document.querySelectorAll("img");

  // 遍历每个 <img> 标签
  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      // 判断是否为相对路径（以 / 开头）
      if (src.startsWith("/")) {
        // 将相对路径转换为绝对路径
        const absoluteUrl = window.location.origin + src;
        // eslint-disable-next-line no-param-reassign
        img.src = absoluteUrl;
      } else if (!src.startsWith("http:") && !src.startsWith("https:")) {
        // const absoluteUrl = `${window.location.href  }/${  src}`;
        // // eslint-disable-next-line no-param-reassign
        // img.src = absoluteUrl;

        // 处理相对路径（如 'logo.png' 或 './logo.png' 或 '../logo.png'）
        const baseUrl = window.location.href.substring(
          0,
          window.location.href.lastIndexOf("/") + 1
        );
        // eslint-disable-next-line no-param-reassign
        img.src = new URL(src, baseUrl).href;
      }
    }
  });
};
</script>
