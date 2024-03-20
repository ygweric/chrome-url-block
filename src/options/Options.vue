<template>
  <a-layout class="h-screen">
    <a-layout-header class="h-20 flex items-center justify-center">
      <Logo />
      <div class="text-lg text-gray-600 font-bold">URL Block</div>
    </a-layout-header>
    <a-layout-content class="px-96">
      <a-form ref="formRef" :model="form" class="w-full">
        <a-row :gutter="8">
          <a-col :span="16">
            <a-form-item
              label-col-flex="200px"
              field="url"
              tooltip="Enter the URL you want to block"
              label="URL/Domain To Block"
              required
            >
              <a-input
                v-model="form.url"
                placeholder="please enter the URL or domain..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-space>
              <a-button status="warning" type="primary" @click="addDomain">
                <template #icon>
                  <IconCompass />
                </template>
                Block By Domain
              </a-button>
              <a-button status="warning" type="outline" @click="addUrl">
                <template #icon>
                  <IconComputer />
                </template>
                Block By Address
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-tabs :active-key="activedTabKey" @tab-click="onTabClick">
        <a-tab-pane key="domain">
          <template #title> <IconCompass /> Domains </template>
        </a-tab-pane>
        <a-tab-pane key="address" title="">
          <template #title> <IconComputer /> Addresses </template>
        </a-tab-pane>
      </a-tabs>
      <a-table
        :columns="activedTabKey === 'domain' ? domainColumns : urlColumns"
        :data="activedTabKey === 'domain' ? domains : urls"
        :pagination="{ 'show-page-size': true, 'show-total': true }"
      >
        <template #actions="{ record }">
          <a-space>
            <!-- <a-button @click="updateUrl(record)">
              Edit
            </a-button> -->
            <a-popconfirm
              :content="`Delete '${
                activedTabKey === 'domain' ? record.domain : record.url
              }' ?`"
              ok-text="OK"
              cancel-text="Cancel"
              @ok="removeUrl(record)"
            >
              <a-button type="primary" status="danger"> Delete </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-layout-content>
    <a-layout-footer class="h-12 flex items-center justify-center">
      <a-space size="large">
        <div class="text-gray-500 text-xl">
          <span>URL BLock</span>
        </div>
        <div class="text-gray-500">
          <IconUser class="mr-1" />
          <span>Author: Eric Yang</span>
        </div>
        <div class="text-gray-500">
          <IconEmail class="mr-1" />
          <span>Mail: ygweric@gmail.com</span>
        </div>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import {
  IconCompass,
  IconComputer,
  IconEmail,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import { addBlockDomain, addBlockURL, removeBlockURL } from "~/logic/general";
import { blockedDomains, blockedUrls } from "~/logic/storage";

const activedTabKey = ref("domain");

const form = reactive({ url: "" });
const formRef = ref();

const urlColumns = [
  {
    title: "URLs",
    dataIndex: "url",
    ellipsis: true,
    tooltip: true,
  },
  {
    width: 200,
    title: "Actions",
    slotName: "actions",
  },
];
const domainColumns = [
  {
    title: "Domains",
    dataIndex: "domain",
    ellipsis: true,
    tooltip: true,
  },
  {
    width: 200,
    title: "Actions",
    slotName: "actions",
  },
];

const onTabClick = (key: string) => {
  activedTabKey.value = key;
};

const addUrl = async () => {
  const errors = await formRef.value.validate();
  if (errors) return;
  addBlockURL(form.url);
};
const addDomain = async () => {
  const errors = await formRef.value.validate();
  if (errors) return;
  addBlockDomain(form.url);
};

// const updateUrl = (record: any) => {
//   console.log('updateUrl', record)
// }

const removeUrl = (record: { url: string }) => {
  console.log("remove", record);
  removeBlockURL(record.url);
};
// const urls = computed(() => blockedUrls.value.sort((a, b) => (a > b) ? 1 : -1).map(url => ({ url })))
const urls = computed(() => blockedUrls.value.map((url) => ({ url })));
const domains = computed(() =>
  blockedDomains.value.map((domain) => ({ domain }))
);
</script>
