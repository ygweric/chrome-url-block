<script setup lang="ts">
import { blockedUrls } from '~/logic'
import { addBlockURL } from '~/logic/general'

// import { Tooltip } from '@arco-design/web-vue';

const form = reactive({
  newUrl: '',
})

const handleBlockNewUrl = ({ values, errors }: { values: typeof form;errors: any[] }) => {
  if (errors)
    return

  addBlockURL(values.newUrl)
  // console.log('values:', values, '\nerrors:', errors)
}
</script>

<template>
  <a-layout class="h-screen">
    <a-layout-header class="h-20 flex items-center justify-center">
      <Logo />
      <div class="font-size-6 color-red-600 font-bold">
        URL Block
      </div>
    </a-layout-header>
    <a-layout-content class="px-80">
      <a-form :model="form" class="w-full" @submit="handleBlockNewUrl">
        <a-row :gutter="8">
          <a-col :span="18">
            <a-form-item field="newUrl" tooltip="Enter the url you want to block" label="Url To Block" required>
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
    </a-layout-content>
    <a-layout-footer class="h-12 flex items-center justify-center">
      Url BLock
    </a-layout-footer>
  </a-layout>
</template>
