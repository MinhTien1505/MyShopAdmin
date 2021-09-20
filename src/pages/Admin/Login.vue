<template>
  <div class="bg-login">
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">Login</h3>
                  </div>
                  <div class="card-body">
                    <v-form
                      ref="form"
                      @submit.prevent="submitForm"
                      enctype="/multipart/form-data"
                    >
                      <div class="form-group">
                        <label class="small mb-1">Uername</label>
                        <input
                          class="form-control py-4"
                          v-model="username"
                          placeholder="Enter username"
                        />
                      </div>
                      <div class="form-group">
                        <label class="small mb-1">Password</label>
                        <input
                          class="form-control py-4"
                          v-model="password"
                          type="password"
                          placeholder="Enter password"
                        />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox">
                          <input
                            class="custom-control-input"
                            id="rememberPasswordCheck"
                            type="checkbox"
                          />
                          <label
                            class="custom-control-label"
                            for="rememberPasswordCheck"
                            >Remember password</label
                          >
                        </div>
                      </div>
                      <div
                        class="btn-login-container"
                        style="display: flex; justify-content: right;"
                      >
                        <button class="btn btn-primary pl-4 pr-4">Login</button>
                      </div>
                      <v-snackbar
                        v-model="snackbar"
                        color="success"
                        timeout="3000"
                        :multi-line="true"
                        outlined
                        class="pb-5"
                      >
                        {{ message }}

                        <template v-slot:action="{ attrs }">
                          <v-btn
                            color="red"
                            fab
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </template>
                      </v-snackbar>
                    </v-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      snackbar: false,
      message: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      if (!this.username || !this.password) {
        this.snackbar = true;
        this.message = "Please enter uername and password!";
        return;
      }
      await axios
        .post("http://localhost:5000/api/loginadmin", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res.data);
          let admin_login = JSON.stringify(res.data.accessToken);
          sessionStorage.setItem("admin_login", admin_login);
          this.$router.push({ name: "DashboardHome" });
        })
        .catch((err) => {
          console.log(err);
          this.snackbar = true;
          this.message = "Username or passwrod incorect!";
        });
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/Admin/css/styles.css";
@import url(https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css);

.btn-login-container {
  display: flex;
  justify-content: right;
}

.bg-login {
  background-color: #6ba6e6e5;
}
</style>
