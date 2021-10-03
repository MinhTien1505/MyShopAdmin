import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Products from "../pages/Products.vue";
import CreateProduct from "../pages/CreateProduct.vue";
import EditProduct from "../pages/EditProduct.vue";
import PageNotFound from "../components/PageNotFound.vue";
import DashboardContent from "../pages/DashboardContent.vue";

import Users from "../pages/user/Users.vue";
import CreateUser from "../pages/user/CreateUser.vue";
import EditUser from "../pages/user/EditUser.vue";

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

      // Manage product
      { path: "products", name: "ListProduct", component: Products },
      { path: "create-product", name: "CreateProduct", component: CreateProduct,},
      { path: "edit-product", name: "EditProduct", component: EditProduct },

      // Manage user
      { path: "users", name: "ListUser", component: Users },
      { path: "create-user", name: "CreateUser", component: CreateUser },
      { path: "edit-user", name: "EditUser", component: EditUser },

      // Error
      { path: "*", name: "PageNotFound", component: PageNotFound },
    ],
  },
];

export default routerAdmin;
