import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";
import "@ionic/vue/css/ionic.bundle.css";

/* Theme variables */
import "./theme/variables.css";
import { store, key } from "./store";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store, key);

router.isReady().then(() => {
  app.mount("#app");
});
