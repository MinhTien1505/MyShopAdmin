import Login from "../pages/Login.vue";
import PageNotFound from "../components/PageNotFound.vue";

// Vuetify dashboard
import Dashboard from "../pages/Dashboard.vue";

// Group manage
import Groups from "../pages/group-manage/Groups.vue";
import CreateGroup from "../pages/group-manage/CreateGroup.vue";
import ViewGroup from "../pages/group-manage/ViewGroup.vue";

import ProductList from "../pages/product/ProductList.vue";
import CreateProduct from "../pages/product/CreateProduct.vue";
import EditProduct from "../pages/product/EditProduct.vue";
import Warehouse from "../pages/product/Warehouse.vue";

import Home from "../pages/dashboard/Home.vue";

// User manage
import ListUsers from "../pages/user-manage/Users.vue";
import CreateUser from "../pages/user-manage/CreateUser.vue";
import ViewUser from "../pages/user-manage/ViewUser.vue";

// Order manage
import ListOrders from "../pages/order-manage/Orders.vue";
import ViewOrder from "../pages/order-manage/ViewOrder.vue";

// Category manage
import Category from "../pages/product/Category.vue";
import CategoryDetail from "../pages/product/CategoryDetail.vue";

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
      { path: "home", name: "Home", component: Home },
      // Manage group
      { path: "groups", name: "ListGroup", component: Groups },
      { path: "create-group", name: "CreateGroup", component: CreateGroup },
      { path: "view-group", name: "ViewGroup", component: ViewGroup },
      // Manage product
      { path: "product-list", name: "ProductList", component: ProductList },
      { path: "product-list/:id", name: "EditProduct", component: EditProduct },
      {
        path: "create-product",
        name: "CreateProduct",
        component: CreateProduct,
      },
      { path: "warehouse", name: "Warehouse", component: Warehouse },

      // Manage user
      { path: "users", name: "ListUser", component: ListUsers },
      { path: "create-user", name: "CreateUser", component: CreateUser },
      { path: "view-user", name: "ViewUser", component: ViewUser },

      // Manage order
      { path: "orders", name: "ListOrder", component: ListOrders },
      { path: "view-order", name: "ViewOrder", component: ViewOrder },

      // Manage category
      { path: "category", name: "Category", component: Category },
      {
        path: "category/:id",
        name: "CategoryDetail",
        component: CategoryDetail,
      },
    ],
  },
  { path: "*", name: "ShipperPageNotFound", component: PageNotFound },
];

export default routerAdmin;
