import Login from "../../pages/Admin/Login.vue";
import Dashboard from "../../pages/Admin/Dashboard.vue";
import Products from "../../pages/Admin/Products.vue";
import CreateProduct from "../../pages/Admin/CreateProduct.vue";
import EditProduct from "../../pages/Admin/EditProduct.vue";
import PageNotFound from "../../components/PageNotFound.vue";
import DashboardContent from "../../pages/Admin/DashboardContent.vue";

const routerAdmin = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem("admin_login")) {
        next();
      } else {
        next("/dashboard");
      }
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem("admin_login")) {
        next("/admin");
      } else {
        next();
      }
    },
    children: [
      { path: "", name: "DashboardHome", component: DashboardContent },
      { path: "products", name: "ListProduct", component: Products },
      {
        path: "create-product",
        name: "CreateProduct",
        component: CreateProduct,
      },
      { path: "edit-product", name: "EditProduct", component: EditProduct },
      { path: "*", name: "PageNotFound", component: PageNotFound },
    ],
  },
];

export default routerAdmin;
