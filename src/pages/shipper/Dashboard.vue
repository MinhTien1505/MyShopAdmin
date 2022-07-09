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
      <v-list-item class="logo">
        <div>
          <svg width="114" height="50" viewBox="0 0 114 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.34375 18H4.89773V12.8864H9.9858V10.0227H4.89773V7.77273H10.5483V4.90909H1.34375V18ZM11.8555 18H15.4094V13.679H16.6367L18.9379 18H22.7987L20.1396 13.1165C21.533 12.4453 22.364 11.1733 22.364 9.35795C22.364 6.57102 20.4144 4.90909 17.506 4.90909H11.8555V18ZM15.4094 10.9176V7.74716H16.6623C17.9087 7.74716 18.6566 8.23295 18.6566 9.35795C18.6566 10.4766 17.9087 10.9176 16.6623 10.9176H15.4094ZM23.8789 18H33.288V15.1364H27.4329V12.8864H32.8278V10.0227H27.4329V7.77273H33.3136V4.90909H23.8789V18ZM42.133 9H45.5336C45.5208 6.4304 43.5392 4.73011 40.3688 4.73011C37.2559 4.73011 35.057 6.40483 35.0762 8.89773C35.0698 10.9432 36.4888 12.081 38.8091 12.5795L40.1131 12.8608C41.5705 13.1804 42.0691 13.5447 42.0819 14.1392C42.0691 14.7848 41.481 15.2386 40.3432 15.2386C38.9817 15.2386 38.1763 14.5994 38.1188 13.3977H34.7438C34.7566 16.6832 36.981 18.1534 40.3944 18.1534C43.7118 18.1534 45.6998 16.7216 45.7125 14.1392C45.6998 12.1449 44.5108 10.745 41.6216 10.125L40.5478 9.89489C39.3077 9.63281 38.7516 9.26847 38.7836 8.64205C38.79 8.06676 39.2694 7.64489 40.3688 7.64489C41.5194 7.64489 42.0627 8.14986 42.133 9ZM47.0645 18H50.6184V12.8864H55.323V18H58.877V4.90909H55.323V10.0227H50.6184V4.90909H47.0645V18Z"
              fill="#FFC928" />
            <path
              d="M61.3438 18H64.8977V12.8864H69.9858V10.0227H64.8977V7.77273H70.5483V4.90909H61.3438V18ZM84.5373 11.4545C84.5373 7.08239 81.7248 4.73011 78.1708 4.73011C74.5913 4.73011 71.8043 7.08239 71.8043 11.4545C71.8043 15.8011 74.5913 18.179 78.1708 18.179C81.7248 18.179 84.5373 15.8267 84.5373 11.4545ZM80.881 11.4545C80.881 13.8068 79.935 15.0852 78.1708 15.0852C76.4066 15.0852 75.4606 13.8068 75.4606 11.4545C75.4606 9.10227 76.4066 7.82386 78.1708 7.82386C79.935 7.82386 80.881 9.10227 80.881 11.4545ZM98.8635 11.4545C98.8635 7.08239 96.051 4.73011 92.497 4.73011C88.9174 4.73011 86.1305 7.08239 86.1305 11.4545C86.1305 15.8011 88.9174 18.179 92.497 18.179C96.051 18.179 98.8635 15.8267 98.8635 11.4545ZM95.2072 11.4545C95.2072 13.8068 94.2612 15.0852 92.497 15.0852C90.7328 15.0852 89.7868 13.8068 89.7868 11.4545C89.7868 9.10227 90.7328 7.82386 92.497 7.82386C94.2612 7.82386 95.2072 9.10227 95.2072 11.4545ZM105.545 18C109.533 18 112.065 15.5455 112.065 11.4545C112.065 7.36364 109.533 4.90909 105.494 4.90909H100.508V18H105.545ZM104.062 14.983V7.92614H105.315C107.36 7.92614 108.485 8.71875 108.485 11.4545C108.485 14.1903 107.36 14.983 105.417 14.983H104.062Z"
              fill="#FFF" />
          </svg>
        </div>
      </v-list-item>
      <v-divider></v-divider>

      <!-- list đơn -->
      <v-list>
        <v-list-item color="gray" v-for="item in items" :key="item.title" :to="item.route" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-footer padless>
          <v-col class="text-center" cols="12">
            <h6>Copyright © Shop Fresh {{ new Date().getFullYear() }}</h6>
          </v-col>
        </v-footer>
      </template>
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
  name: "App",
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
        {
          title: "Delivered",
          icon: "mdi-check-underline",
          route: "/shipper/history/",
        },
      ],
    };
  },
  methods: {
    logout() {
      if (sessionStorage.getItem("admin_login")) {
        sessionStorage.removeItem("admin_login");
      }
      if (sessionStorage.getItem("shipper_login")) {
        sessionStorage.removeItem("shipper_login");
      }

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/styles.css";
@import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);

.logo {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
