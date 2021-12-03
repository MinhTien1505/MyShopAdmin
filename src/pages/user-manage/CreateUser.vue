<template>
  <v-container class="pa-6">
    <form enctype="multipart/form-data">
      <v-row>
        <v-col cols="7">
          <h3 class="pb-4 pt-4">Create New User</h3>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">*Username: </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                v-model="user.username"
                @keyup="checkUsername()"
                id="username"
                required
              />
              <p class="error-msg" id="username-msg">This is required</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">*Password: </label>
            <div class="col-sm-8">
              <input
                type="password"
                class="form-control"
                v-model="user.password"
                @keyup="checkPassword()"
                id="password"
                required
              />
              <p class="error-msg" id="password-msg">This is required</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">*Confirm Password: </label>
            <div class="col-sm-8">
              <input
                type="password"
                class="form-control"
                v-model="confirm_password"
                @keyup="checkPassword()"
                id="confirm-password"
                required
              />
              <p class="error-msg" id="confirm-msg">This is required</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Role: </label>
            <div class="col-sm-8">
              <input
                type="radio"
                class="radio-input"
                value="shipper"
                v-model="user.position"
                @change="check()"
                :checked="user.position == 'shipper'"
              />
              <label for="shipper">Shipper</label>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Full Name: </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                v-model="user.full_name"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">*Email: </label>
            <div class="col-sm-8">
              <input
                type="email"
                class="form-control"
                v-model="user.email"
                @keyup="checkEmail()"
                id="email"
                required
              />
              <p class="error-msg" id="email-msg">This is required</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Birthdate: </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                v-model="user.birthdate"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Address: </label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="user.address" />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Phone: </label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="user.phone" />
            </div>
          </div>

          <div class="text-right p-3">
            <v-btn class="ma-2" 
              outlined 
              @click="cancel()">
              Cancel
            </v-btn>
            <v-btn class="ma-2" 
              depressed 
              color="#FF8D9A" 
              @click="submit()" 
              :disabled="isDisabled">
              Create
            </v-btn>
          </div>
        </v-col>

        <v-col cols="5">
          <h3 class="pb-4 pt-4"></h3>
          <div>
            <img
              v-if="previewImage == ''"
              id="avatar-preview"
              src="../../../public/assets/assets/img/avatar-placeholder.png"
            />
            <img
              v-else
              id="avatar-preview"
              @click="selectImage"
              :src="`${previewImage}`"
            />
          </div>
          <div class="text-center">
            <label class="upload-img" for="upload-photo" style="backgroud-color: #675E55">
              <i class="fas fa-upload"></i> Upload avatar here!
            </label>
            <input
              type="file"
              name="photo"
              id="upload-photo"
              accept="image/*"
              ref="fileInput"
              @input="pickFile"
              @change="selectedFile"
            />
          </div>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  components: {},
  data: () => ({
    previewImage: "",
    snackbar: false,
    user: {
      username: "",
      password: "",
      full_name: "",
      email: "",
      position: "shipper",
      birthdate: "",
      address: "",
      phone: "",
      avatar: "",
      status: "active",
    },
    confirm_password: "",
    email_invalid: false,
    username_invalid: false,
    password_invalid: false,
    confirm_invalid: false,
    error_exist: true,
    isInputActive: false,
    isDisabled: true,
  }),
  methods: {
    check() {
      console.log("Position: " + this.user.position);
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    selectedFile(e) {
      this.user.avatar = e.target.files[0];
    },
    checkSubmit() {
      if (
        this.email_invalid &&
        this.username_invalid &&
        this.password_invalid &&
        this.confirm_invalid
      ) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    checkEmail() {
      const msg = "This is not email!";
      var reg =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!$("#email").val().match(reg)) {
        this.email_invalid = false;
        $("#email-msg").html(msg).css({ display: "block", color: "#FF483B" });
        this.checkSubmit();
      } else {
        this.email_invalid = true;
        $("#email-msg").css({ display: "none" });
        this.checkSubmit();
      }
    },
    checkUsername() {
      const msg =
        "Must contain between 8 and 20 characters, including letters, numbers and underscore!";
      var reg = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{4,20}$/;
      if (!$("#username").val().match(reg)) {
        this.username_invalid = false;
        $("#username-msg")
          .html(msg)
          .css({ display: "block", color: "#FF483B" });
        this.checkSubmit();
      } else {
        this.username_invalid = true;
        $("#username-msg").css({ display: "none" });
        this.checkSubmit();
      }
    },
    checkPassword() {
      if (this.validatePassword()) {
        $("#password-msg").css({ display: "none" });
        if ($("#password").val() == $("#confirm-password").val()) {
          this.confirm_invalid = true;
          $("#confirm-msg")
            .html("Matching")
            .css({ display: "block", color: "#04AA6D" });
          this.checkSubmit();
        } else {
          this.confirm_invalid = false;
          $("#confirm-msg")
            .html("Not Matching")
            .css({ display: "block", color: "#FF483B" });
          this.checkSubmit();
        }
      }
    },
    validatePassword() {
      const msg =
        "Must contain between 8 and 20 characters, including uppercase, lowercase letters, numbers and special characters!";
      var reg = /^(?=.*[0-9])(?=.*[!@.#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,20}$/;
      if (!$("#password").val().match(reg)) {
        this.password_invalid = false;
        $("#password-msg")
          .html(msg)
          .css({ display: "block", color: "#FF483B" });
        $("#confirm-msg").css({ display: "none" });
        this.checkSubmit();
        return false;
      } else {
        this.password_invalid = true;
        this.checkSubmit();
        return true;
      }
    },
    test() {
      console.log("username" + this.user.username);
      console.log("password" + this.user.password);
      console.log("full_name" + this.user.full_name);
      console.log("email" + this.user.email);
      console.log("position" + this.user.position);
      console.log("birthdate" + this.user.birthdate);
      console.log("address" + this.user.address);
      console.log("phone" + this.user.phone);
      console.log("avatar" + this.user.avatar);
      console.log("status" + this.user.status);
    },
    async submit() {
      axios.post;
      const formData = new FormData();
      formData.append("username", this.user.username);
      formData.append("password", this.user.password);
      formData.append("full_name", this.user.full_name);
      formData.append("email", this.user.email);
      formData.append("position", this.user.position);
      formData.append("birthdate", this.user.birthdate);
      formData.append("address", this.user.address);
      formData.append("phone", this.user.phone);
      formData.append("avatar", this.user.avatar);
      formData.append("status", this.user.status);

      this.error_exist = true;
      await axios
        .get(`http://localhost:5000/api/email-exist/${this.user.email}`)
        .catch((error) => {
          console.log(error.response.data.message);
          if (error.response.data.message) {
            let msg = error.response.data.message;
            if (msg == "Email already exists!") {
              this.email_invalid = false;
              this.error_exist = false;
              $("#email-msg")
                .html(msg)
                .css({ display: "block", color: "#FF483B" });
              this.checkSubmit();
            }
          }
        });

      await axios
        .get(`http://localhost:5000/api/username-exist/${this.user.username}`)
        .catch((error) => {
          console.log(error.response.data.message);
          if (error.response.data.message) {
            let msg = error.response.data.message;
            if (msg == "Username already exists!") {
              this.username_invalid = false;
              this.error_exist = false;
              $("#username-msg")
                .html(msg)
                .css({ display: "block", color: "#FF483B" });
              this.checkSubmit();
            }
          }
        });

      if (this.error_exist) {
        await axios
          .post("http://localhost:5000/api/createShipper", formData)
          .then((res) => {
            this.$router.push({
              name: "ListUser",
              params: { message: res.data.message },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async createUser() {
      if (!this.user.avatar) {
        this.snackbar = true;
        return;
      }
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };
      const formData = new FormData();
      formData.append("username", this.user.username);
      formData.append("password", this.user.password);
      formData.append("full_name", this.user.full_name);
      formData.append("email", this.user.email);
      formData.append("position", this.user.position);
      formData.append("birthdate", this.user.birthdate);
      formData.append("address", this.user.address);
      formData.append("phone", this.user.phone);
      formData.append("status", this.user.status);
      formData.append("avatar", this.user.avatar);

      axios
        .post("http://localhost:5000/api/createUser", formData, config)
        .then((res) => {
          this.$router.push({
            name: "ListUser",
            params: { message: res.data.message },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.$router.push({ name: "ListUser" });
    },
  },
};
</script>

<style scoped>
.row label.col-form-label {
  /* display: block; */
  text-align: right;
}

.row input {
  width: 100%;
}

h3 {
  text-align: right;
}

#avatar-preview {
  width: 250px;
  height: 250px;
  display: block;
  border: 1px solid #212529;
  border-radius: 4px;
  /* padding-top: 10px; */
  margin: 40px auto 10px;

  background-color: #21252910;
  cursor: pointer;
  object-fit: cover;
}

label.upload-img {
  cursor: pointer;
  background-color: #242424;
  padding: 8px 15px;
  color: #ffffff;
  border: 1px solid #212529;
  font-weight: 500;
  border-radius: 4px;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.btn-create-new {
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #4c6ef5;
  color: #ffffff;
  border: 1px solid #4c6ef5;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
}

.btn-create-new i {
  padding-right: 8px;
}

.btn-cancel {
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #ffffff;
  color: #4c6ef5;
  border: 1px solid #4c6ef5;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
}

.btn-cancel i {
  padding-right: 8px;
}

.error-msg {
  display: none;
  text-align: left;
  margin-right: 24px;
  padding-top: 8px;
  font-weight: 400;

  word-break: break-word;
}

.submit-disable {
  opacity: 50%;
}

.row input[type="radio"] {
  width: fit-content;
  margin: 0 1rem;
}
</style>
