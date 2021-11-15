<template>
  <div id="shop-body-wrap" class="sb-nav-fixed">
    <loading-overlay
      :active="isLoading"
      :is-full-page="true"
      :loader="loader"
      :opacity="opacity"
      :width="width"
      :height="height"
      background-color="#C0C0C0"
    />
    <AdminNavbar></AdminNavbar>
    <div id="layoutSidenav">
      <AdminSidebar></AdminSidebar>

      <!-- MAIN CONTENT Start -->
      <div id="layoutSidenav_content">
        <main>
          <router-view></router-view>
        </main>
      </div>
      <!-- MAIN CONTENT End -->
    </div>
  </div>
</template>

<script>
import AdminNavbar from "../components/AdminNarbar.vue";
import AdminSidebar from "../components/AdminSidebar.vue";
import "../assets/scripts/scripts";

export default {
  name: "App",
  components: {
    AdminNavbar,
    AdminSidebar,
  },
  data: () => ({
    isLoading: true,
    loader: "spinner",
    opacity: 1,
    width: 100,
    height: 100,
  }),
  mounted() {
    this.isLoading = false;
  },
};
</script>

<style scoped>
@import "../../public/assets/css/styles.css";
@import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);
</style>
