<template>
  <div class="container-fluid">
    <h1 class="mt-4">Dashboard</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <!-- Primary card -->
        <CardPrimary></CardPrimary>
      </div>

      <div class="col-xl-3 col-md-6">
        <!-- Warning card -->
        <CardWarning></CardWarning>
      </div>

      <div class="col-xl-3 col-md-6">
        <!-- Success card -->
        <CardSuccess></CardSuccess>
      </div>

      <div class="col-xl-3 col-md-6">
        <!-- Danger card -->
        <CardDanger></CardDanger>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <!-- Area chart -->
        <ChartArea></ChartArea>
      </div>
      <div class="col-xl-6">
        <!-- Bar chart -->
        <ChartBar></ChartBar>
      </div>
    </div>
    <!-- Table -->
    <AdminTable></AdminTable>
  </div>
</template>

<script>
import AdminTable from "../components/AdminTable.vue";

import CardPrimary from "../components/CardPrimary.vue";
import CardWarning from "../components/CardWarning.vue";
import CardSuccess from "../components/CardSuccess.vue";
import CardDanger from "../components/CardDanger.vue";
import ChartArea from "../components/ChartArea.vue";
import ChartBar from "../components/ChartBar.vue";

export default {
  components: {
    CardPrimary,
    CardWarning,
    CardSuccess,
    CardDanger,
    ChartArea,
    ChartBar,
    AdminTable,
  },
};
</script>

<style scoped>
@import "../../public/assets/css/styles.css";
@import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);
</style>
