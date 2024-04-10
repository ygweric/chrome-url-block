<template>
  <a-layout class="h-screen">
    <a-layout-header class="h-20 flex items-center justify-center">
      <Logo />
      <div class="text-lg text-gray-600 font-bold">URL Block</div>
    </a-layout-header>
    <a-layout-content class="px-96">
      <a-form ref="formRef" :model="form" class="w-full">
        <a-row :gutter="8">
          <a-col :span="14">
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
          <a-col :span="10">
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
              <a-dropdown trigger="hover" @select="handleMoreAction">
                <a-button>More</a-button>
                <template #content>
                  <a-doption value="regex">
                    <template #icon>
                        <IconCodeSquare />
                    </template>
                    <template #default>Block By Regex</template>
                  </a-doption>
                </template>
             </a-dropdown>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-tabs :active-key="activedTabKey" @tab-click="onTabClick">
        <a-tab-pane key="domain">
          <template #title> <IconCompass /> Domains </template>
        </a-tab-pane>
        <a-tab-pane key="url">
          <template #title> <IconComputer /> Addresses </template>
        </a-tab-pane>
        <a-tab-pane key="regex">
          <template #title> <IconCodeSquare /> Regex </template>
        </a-tab-pane>
      </a-tabs>
      <a-table
        :columns="columns[activedTabKey as keyof typeof columns]"
        :data="tableData[activedTabKey as keyof typeof tableData].value"
        :pagination="{ 'show-page-size': true, 'show-total': true }"
      >
        <template #actions="{ record }">
          <a-space>
            <a-popconfirm
              :content="`Delete '${record[activedTabKey]}' ?`"
              ok-text="OK"
              cancel-text="Cancel"
              @ok="removeFns[activedTabKey as keyof typeof removeFns](record)"
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
import { Message } from "@arco-design/web-vue";
import {
  IconCompass,
  IconComputer,
  IconEmail,
  IconCodeSquare,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import {
  addBlockDomain,
  addBlockRegex,
  addBlockURL,
  removeBlockDomain,
  removeBlockRegex,
  removeBlockURL,
} from "~/logic/general";
import { blockedDomains, blockedUrls, blockedRegexes } from "~/logic/storage";

const activedTabKey = ref("domain");

const form = reactive({ url: "" });
const formRef = ref();


const columns = {
  url: [
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
  ],
  domain: [
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
  ], 
  regex: [
    {
      title: "Regex",
      dataIndex: "regex",
      ellipsis: true,
      tooltip: true,
    },
    {
      width: 200,
      title: "Actions",
      slotName: "actions",
    },
  ]
}

const urls = computed(() => blockedUrls.value.map((url) => ({ url })));
const domains = computed(() =>
  blockedDomains.value.map((domain) => ({ domain }))
);

const regexes = computed(() =>
  blockedRegexes.value.map((regex) => ({ regex }))
);


const tableData = {
  url: urls,
  domain: domains,
  regex: regexes
}


const onTabClick = (key: string) => {
  activedTabKey.value = key;
};

const addUrl = async () => {
  const errors = await formRef.value.validate();
  if (errors) return;
  addBlockURL(form.url);
  Message.success('added')
  activedTabKey.value='url'
  // formRef.value.resetFields()
};
const addDomain = async () => {
  const errors = await formRef.value.validate();
  if (errors) return;
  addBlockDomain(form.url);
  Message.success('added')
  activedTabKey.value='domain'
  // formRef.value.resetFields()
};
const addRegex = async () => {
  const errors = await formRef.value.validate();
  if (errors) return;
  addBlockRegex(form.url);
  Message.success('added')
  activedTabKey.value='regex'
  // formRef.value.resetFields()
};


const removeUrl = (record: { url: string }) => {
  console.log("remove", record);
  removeBlockURL(record.url);
  Message.success('deleted')
};
const removeDomain = (record: { domain: string }) => {
  console.log("remove", record);
  removeBlockDomain(record.domain);
  
};
const removeRegex = (record: { regex: string }) => {
  console.log("remove", record);
  removeBlockRegex(record.regex);
  
};


const handleMoreAction = (key:any) => {
  switch (key) {
    case 'regex':
    addRegex()
      break;
  
    default:
      break;
  }
};



const removeFns = {
  url: removeUrl,
  domain: removeDomain,
  regex: removeRegex
}


</script>
