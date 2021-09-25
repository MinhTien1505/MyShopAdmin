<template>
  <div id="layoutError">
    <div id="layoutError_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mt-4">
                <img
                  class="mb-4 img-error"
                  src="../../public/assets/assets/img/error-404-monochrome.svg"
                />
                <p class="lead">
                  This requested URL was not found on this server.
                </p>
                <router-link to="/dashboard">
                  <i class="fas fa-arrow-left mr-1"></i>
                  Return to Dashboard
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
