import Vue from "vue";
import VueRouter from "vue-router";
import routerAdmin from "./Admin/index";
// import routerShop from "./Shop/index";
Vue.use(VueRouter);

const routes = [...routerAdmin];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
