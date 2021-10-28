import Vue from "vue";
import VueRouter from "vue-router";
import routerAdmin from "./router_admin";
import routerShipper from "./router_shipper";
// import routerShop from "./Shop/index";
Vue.use(VueRouter);

const routes = [...routerAdmin, ...routerShipper];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes,
});

export default router;
