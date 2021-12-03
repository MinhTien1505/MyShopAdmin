<template>
  <!-- <div id="shop-body-wrap" class="sb-nav-fixed">
    <AdminNavbar></AdminNavbar>
    <div id="layoutSidenav">
      <ShipperSidebar></ShipperSidebar>
      <div id="layoutSidenav_content">
        <main>
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div> -->

  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#393E46" dark>
      <!--  -->
      <v-list-item>
        <v-img height="40px"></v-img>
      </v-list-item>
      <v-divider></v-divider>

      <!-- list đơn -->
      <v-list>
        <v-list-item
          color="info"
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#222831" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="mr-2">Shipper</span>
      <v-menu bottom :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in option" :key="item" @click="logout()">
            <v-list-item-title>{{ item }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import "../../assets/scripts/scripts";

export default {
  name: 'App',
  data() {
    return {
      option: ["Settings", "Change Password", "Logout"],
      drawer: null,
      items: [
        {
          title: "Order",
          icon: "mdi-receipt",
          route: "/shipper/orders/",
        },
        {
          title: "Pick-up",
          icon: "mdi-package",
          route: "/shipper/pickup/",
        },
        {
          title: "Shipping",
          icon: "mdi-truck",
          route: "/shipper/shipping/",
        },
      ],
    }
  },
  methods: {
    logout() {
      if(sessionStorage.getItem("admin_login")) {
        sessionStorage.removeItem("admin_login");
      } 
      if (sessionStorage.getItem("shipper_login")) {
        sessionStorage.removeItem("shipper_login");
      }
      
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
@import "../../../public/assets/css/styles.css";
@import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);
</style>
