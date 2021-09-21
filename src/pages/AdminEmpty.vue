<template>
    <div id="shop-body-wrap" class="sb-nav-fixed">
        <AdminNavbar></AdminNavbar>
        <div id="layoutSidenav">
            <AdminSidebar></AdminSidebar>
            <!-- MAIN CONTENT Start -->
            
            <!-- MAIN CONTENT End -->
        </div>
    </div>
</template>

<script>
import AdminNavbar from '../components/AdminNarbar.vue';
import AdminSidebar from '../components/AdminSidebar.vue';

export default {
    components: {
        AdminNavbar,
        AdminSidebar,
    },
}
</script>

<style scoped>
    @import '../../public/assets/css/styles.css';
    @import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);
</style>
