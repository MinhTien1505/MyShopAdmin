<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../../public/assets_login/images/img-01.png" alt="IMG" />
        </div>

        <form @submit.prevent="submitForm" class="login100-form validate-form">
          <span class="login100-form-title">
            Admin Login
          </span>

          <div
            class="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              class="input100"
              type="text"
              name="email"
              placeholder="Username"
              required
              v-model="username"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>
          </div>

          <div
            class="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              class="input100"
              type="password"
              name="pass"
              placeholder="Password"
              required
              v-model="password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn">
              Login
            </button>
          </div>

          <div class="text-center p-t-12">
            <span class="txt1">
              Forgot
            </span>
            <a class="txt2" href="#">
              Username / Password?
            </a>
          </div>

          <div class="text-center p-t-136">
            <a class="txt2" href="#">
              Create your Account
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
          </div>
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      overlay: false,
    };
  },
  methods: {
    async submitForm() {
      this.overlay = true;
      await axios
        .post("http://localhost:5000/api/loginadmin", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res.data);
          this.overlay = false;
          if (res.data.role == "Admin") {
            let admin_login = JSON.stringify(res.data.accessToken);
            sessionStorage.setItem("admin_login", admin_login);
            this.$router.push({ name: "Home" });
            this.$notify({
              group: "foo",
              type: "success",
              title: "Login",
              text: "Logged in successfully!",
            });
          } else if (res.data.role == "shipper") {
            let shipper_login = JSON.stringify(res.data.accessToken);
            sessionStorage.setItem("shipper_login", shipper_login);
            this.$router.push({ name: "ShipperListOrder" });
            this.$notify({
              group: "foo",
              type: "success",
              title: "Login",
              text: "Logged in successfully!",
            });
          }
        })
        .catch((err) => {
          this.overlay = false;
          console.log(err);
          this.$notify({
            group: "foo",
            type: "error",
            title: "Login",
            text: "Username or password is incorect!",
          });
        });
    },
  },
};
</script>

<style scoped>
@import "../../public/assets_login/css/util.css";
@import "../../public/assets_login/css/main.css";
.vue-notification {
  padding: 20px;
  margin: 0 5px 5px;
  margin-bottom: 55px;

  font-size: 15px;
}
</style>
