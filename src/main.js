import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Notifications from "vue-notification";
import Loading from "vue-loading-overlay";
import VueSimpleAlert from "vue-simple-alert";
import "vue-loading-overlay/dist/vue-loading.css";
import store from './store'

Vue.use(Notifications);
Vue.use(Loading);
Vue.use(VueSimpleAlert);
Vue.component("loading-overlay", Loading);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount("#app");
