import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Admin/Login.vue'
import Dashboard from '../pages/Admin/Dashboard.vue'
import Products from '../pages/Admin/Products.vue'
import CreateProduct from '../pages/Admin/CreateProduct.vue'
import EditProduct from '../pages/Admin/EditProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      { path: 'products', name: "ListProduct", component: Products },
      { path: 'create-product', name: "CreateProduct", component: CreateProduct },
      { path: 'edit-product', name: "EditProduct", component: EditProduct },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
