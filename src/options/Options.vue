<script setup lang="ts">
import { IconEmail, IconUser } from '@arco-design/web-vue/es/icon'
import { blockedUrls } from '~/logic'
import { addBlockURL, removeBlockURL } from '~/logic/general'

const form = reactive({
  newUrl: '',
})

const columns = [{
  title: 'URLs',
  dataIndex: 'url',
  ellipsis: true,
  tooltip: true,
}, {
  width: 200,
  title: 'Actions',
  slotName: 'actions',
}]

const addUrl = ({ values, errors }: { values: typeof form;errors: any[] }) => {
  if (errors)
    return

  addBlockURL(values.newUrl)
  // console.log('values:', values, '\nerrors:', errors)
}

// const updateUrl = (record: any) => {
//   console.log('updateUrl', record)
// }

const removeUrl = (record: { url: string }) => {
  console.log('remove', record)
  removeBlockURL(record.url)
}
// const urls = computed(() => blockedUrls.value.sort((a, b) => (a > b) ? 1 : -1).map(url => ({ url })))
const urls = computed(() => blockedUrls.value.map(url => ({ url })))
</script>

<template>
  <a-layout class="h-screen">
    <a-layout-header class="h-20 flex items-center justify-center">
      <Logo />
      <div class="font-size-6 color-red-600 font-bold">
        URL Block
      </div>
    </a-layout-header>
    <a-layout-content class="px-96">
      <a-form :model="form" class="w-full" @submit="addUrl">
        <a-row :gutter="8">
          <a-col :span="18">
            <a-form-item field="newUrl" tooltip="Enter the URL you want to block" label="URL To Block" required>
              <a-input
                v-model="form.newUrl"
                placeholder="please enter the URL..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" html-type="submit">
              Block It
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-table :columns="columns" :data="urls" :pagination="{ 'show-page-size': true, 'show-total': true }">
        <template #actions="{ record }">
          <a-space>
            <!-- <a-button @click="updateUrl(record)">
              Edit
            </a-button> -->
            <a-popconfirm :content="`Delete '${record.url}' ?`" ok-text="OK" cancel-text="Cancel" @ok="removeUrl(record)">
              <a-button type="primary" status="danger">
                Delete
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-layout-content>
    <a-layout-footer class="h-12 flex items-center justify-center">
      <a-space size="large">
        <div class="text-gray-500 font-xl">
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
