<script setup lang="ts">
import { blockedUrls } from '~/logic'
import { addBlockURL } from '~/logic/general'

// import { Tooltip } from '@arco-design/web-vue';

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

const updateUrl = (record) => {

}

const removeUrl = (record) => {

}
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
            <a-form-item field="newUrl" tooltip="Enter the url you want to block" label="URL To Block" required>
              <a-input
                v-model="form.newUrl"
                placeholder="please enter the url..."
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
      {{ blockedUrls }}
      <a-table :columns="columns" :data="urls" :pagination="{ 'show-page-size': true, 'default-page-size': 6, 'show-total': true }">
        <template #actions="{ record }">
          <a-space>
            <a-button @click="updateUrl(record)">
              Edit
            </a-button>
            <a-button type="primary" status="danger" @click="removeUrl(record)">
              Delete
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-layout-content>
    <a-layout-footer class="h-12 flex items-center justify-center">
      URL BLock
    </a-layout-footer>
  </a-layout>
</template>
