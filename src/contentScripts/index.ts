// import { onMessage } from 'webext-bridge/content-script'
// import { createApp } from 'vue'
// import ArcoVue from '@arco-design/web-vue'
// import App from './views/App.vue'
// import { setupApp } from '~/logic/common-setup'
// import '../styles/contentStyles'

// // Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
// (() => {
//   console.info('[vitesse-webext] Hello world from content script')

//   // communication example: send previous tab title from background page
//   onMessage('tab-prev', ({ data }) => {
//     console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
//   })

//   // mount component to context window
//   const container = document.createElement('div')
//   container.id = __NAME__
//   const root = document.createElement('div')
//   const styleEl = document.createElement('link')
//   // shadowDOM对css中var的支持不好，这里不用shadowDOM
//   // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
//   const shadowDOM = container
//   styleEl.setAttribute('rel', 'stylesheet')
//   styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
//   shadowDOM.appendChild(styleEl)
//   shadowDOM.appendChild(root)
//   document.body.appendChild(container)
//   const app = createApp(App)
//   app.use(ArcoVue)
//   setupApp(app)
//   app.mount(root)
// })()
