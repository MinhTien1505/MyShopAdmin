<template>
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

      <!-- list kép -->
      <v-list>
        <v-list-group
          color="info"
          v-for="item in items1"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            link
            class="pl-8"
            :to="child.link"
            style="text-decoration: none"
          >
            <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#222831" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="mr-2">Admin</span>
      <v-menu bottom :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in option" :key="item" @click="handle(item)">
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
export default {
  data() {
    return {
      option: ["Settings", "Change Password", "Logout"],
      drawer: null,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/dashboard2/home",
        },
        {
          title: "Group",
          icon: "mdi-silverware-fork-knife",
          route: "/dashboard2/groups",
        },
        {
          title: "Admin",
          icon: "mdi-gavel",
          route: "/dashboard2/create-group",
        },
      ],
      items1: [
        {
          action: "mdi-playlist-edit",
          items: [
            {
              title: "Product List",
              icon: "mdi-view-list-outline",
              link: "/dashboard2/product-list",
            },
            {
              title: "Warehourse",
              icon: "mdi-warehouse",
              link: "/dashboard2/warehourse",
            },
          ],
          title: "Products",
        },
      ],
    };
  },
};
</script>

<style>
.v-btn {
  text-transform: unset;
}
a:hover {
  text-decoration: none;
}
</style>
