<template>
  <div id="shop-body-wrap" class="sb-nav-fixed">
    <AdminNavbar></AdminNavbar>
    <div id="layoutSidenav">
      <AdminSidebar></AdminSidebar>

      <!-- MAIN CONTENT Start -->
      <div id="layoutSidenav_content">
        <main>
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </main>
      </div>
      <!-- MAIN CONTENT End -->
    </div>
  </div>
</template>

<script>
import AdminNavbar from "../../components/Admin/AdminNarbar.vue";
import AdminSidebar from "../../components/Admin/AdminSidebar.vue";
import "../../assets/Admin/js/scripts";

export default {
  components: {
    AdminNavbar,
    AdminSidebar,
  },
};
</script>

<style scoped>
@import "../../../public/assets/Admin/css/styles.css";
@import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);
</style>
