import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
app.use(ArcoVue)
setupApp(app)
app.mount('#app')
