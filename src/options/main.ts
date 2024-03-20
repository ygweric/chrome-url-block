import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import mixpanel from "mixpanel-browser";
import { setupApp } from "~/logic/common-setup";
import { MIXPANEL_TOKEN } from "~/logic/constants";
import App from "./Options.vue";
import "../styles";

mixpanel.init(MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

const app = createApp(App);
app.use(ArcoVue);
setupApp(app);
app.mount("#app");
