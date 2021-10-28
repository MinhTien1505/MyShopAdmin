<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <router-link class="nav-link" to="/shipper/dashboard/">
            <div class="sb-nav-link-icon">
              <i class="icofont icofont-home"></i>
            </div>
            Dashboard
          </router-link>
          <div class="sb-sidenav-menu-heading">Manage</div>

          <router-link class="nav-link" to="/shipper/dashboard/orders/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-receipt"></i>
            </div>
            Orders
          </router-link>

          <router-link class="nav-link" to="/shipper/dashboard/pickup/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-boxes"></i>
            </div>
            Pick-up
          </router-link>

          <router-link class="nav-link" to="/shipper/dashboard/shipping/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-shipping-fast"></i>
            </div>
            Shipping
          </router-link>

          <router-link class="nav-link" to="/shipper/dashboard/history/">
            <div class="sb-nav-link-icon">
              <!-- <i class="icofont icofont-home"></i> -->
              <i class="fas fa-history"></i>
            </div>
            History
          </router-link>

          <router-link class="nav-link" to="/shipper/dashboard/statistic/">
            <div class="sb-nav-link-icon">
              <!-- <i class="icofont icofont-home"></i> -->
              <i class="fas fa-chart-line"></i>
            </div>
            Statistic
          </router-link>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        Start Bootstrap
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style></style>
