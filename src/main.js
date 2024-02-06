import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//Pinia config
import { createPinia } from "pinia";

//Emitter config
import mitt from "mitt";
const Emitter = mitt();

//Swiper Config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
createApp(App)
  .use(vuetify)
  .provide("Emitter", Emitter)
  .use(createPinia())
  .use(router)
  .mount("#app");
