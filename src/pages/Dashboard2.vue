<template>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey darken-4"
      dark
    >
      <!--  -->
      <v-list>
        <v-list-item
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

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="black" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
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
      drawer: null,
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard2/home' },
          { title: 'Group', icon: 'mdi-silverware-fork-knife', route: '/dashboard2/groups' },
          { title: 'Admin', icon: 'mdi-gavel',  route: '/dashboard2/create-group' },
        ],
    };
  },
};
</script>

<style>
.v-btn {
  text-transform: unset;
}
</style>
