import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Products from "../pages/Products.vue";
import CreateProduct from "../pages/CreateProduct.vue";
import EditProduct from "../pages/EditProduct.vue";
import PageNotFound from "../components/PageNotFound.vue";
import DashboardContent from "../pages/DashboardContent.vue";
import Warehouse from "../pages/Warehouse.vue";

import Users from "../pages/user/Users.vue";
import CreateUser from "../pages/user/CreateUser.vue";
// import EditUser from "../pages/user/EditUser.vue";
import ViewUser from "../pages/user/ViewUser.vue";

import Orders from "../pages/order/Orders.vue";
import ViewOrder from "../pages/order/ViewOrder.vue";

import TabOrders from "../pages/order/OrdersTab.vue";

const routerAdmin = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("admin_login")) {
        next("/dashboard");
      } else if (sessionStorage.getItem("shipper_login")) {
        next("/shipper/dashboard");
      } else {
        next();
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
      {
        path: "create-product",
        name: "CreateProduct",
        component: CreateProduct,
      },
      { path: "edit-product", name: "EditProduct", component: EditProduct },
      { path: "warehouse", name: "Warehouse", component: Warehouse },

      // Manage user
      { path: "users", name: "ListUser", component: Users },
      { path: "create-user", name: "CreateUser", component: CreateUser },
      // { path: "edit-user", name: "EditUser", component: EditUser },
      { path: "view-user", name: "ViewUser", component: ViewUser },

      // Manage order
      { path: "orders", name: "ListOrder", component: Orders },
      { path: "view-order", name: "ViewOrder", component: ViewOrder },

      { path: "taborders", name: "TabOrders", component: TabOrders },

      // Error
      { path: "*", name: "ShipperPageNotFound", component: PageNotFound },
    ],
  },
];

export default routerAdmin;
