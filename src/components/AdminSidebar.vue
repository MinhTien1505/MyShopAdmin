<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <router-link class="nav-link" to="/dashboard/">
            <div class="sb-nav-link-icon">
              <i class="icofont icofont-home"></i>
            </div>
            Dashboard
          </router-link>
          <div class="sb-sidenav-menu-heading">Manage</div>

          <!-- <a class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts">
            <div class="sb-nav-link-icon">
              <i class="fas fa-list"></i>
            </div>
            Manage Products
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div class="collapse"
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <router-link to="/dashboard/products" class="nav-link">
                <i class="fas fa-list-ol mr-1"></i> Product list
              </router-link>
              <router-link to="/dashboard/warehouse" class="nav-link">
                <i class="fas fa-warehouse mr-1"></i> Warehouse</router-link
              >
              <router-link to="/dashboard/warehouse" class="nav-link">
                <i class="fas fa-cart-plus mr-1"></i> Category</router-link
              >
            </nav>
          </div> -->

          <router-link class="nav-link" to="/dashboard/products">
            <div class="sb-nav-link-icon">
              <!-- <i class="icofont icofont-home"></i> -->
              <i class="fas fa-cube"></i>
            </div>
            Manage Products
          </router-link>

          <router-link class="nav-link" to="/dashboard/users/">
            <div class="sb-nav-link-icon">
              <!-- <i class="icofont icofont-home"></i> -->
              <i class="fas fa-users"></i>
            </div>
            Manage Users
          </router-link>

          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="false"
            aria-controls="collapsePages"
          >
            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
            Pages
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            class="collapse"
            id="collapsePages"
            aria-labelledby="headingTwo"
            data-parent="#sidenavAccordion"
          >
            <nav
              class="sb-sidenav-menu-nested nav accordion"
              id="sidenavAccordionPages"
            >
              <a
                class="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#pagesCollapseAuth"
                aria-expanded="false"
                aria-controls="pagesCollapseAuth"
              >
                Authentication
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="pagesCollapseAuth"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordionPages"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="#">Login</a>
                  <a class="nav-link" href="#">Register</a>
                  <a class="nav-link" href="#">Forgot Password</a>
                </nav>
              </div>
              <a
                class="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#pagesCollapseError"
                aria-expanded="false"
                aria-controls="pagesCollapseError"
              >
                Error
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="pagesCollapseError"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordionPages"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="#">401 Page</a>
                  <a class="nav-link" href="#">404 Page</a>
                  <a class="nav-link" href="#">500 Page</a>
                </nav>
              </div>
            </nav>
          </div>
          <div class="sb-sidenav-menu-heading">Addons</div>
          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon">
              <i class="fas fa-chart-area"></i>
            </div>
            Charts
          </a>
          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
            Tables
          </a>
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
