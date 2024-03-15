import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import { setupApp } from "~/logic/common-setup";
import App from "./Popup.vue";
import "../styles";

const app = createApp(App);
app.use(ArcoVue);
setupApp(app);
app.mount("#app");
