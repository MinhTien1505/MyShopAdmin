<template>
  <v-container class="pa-6">
    <v-row>
      <v-col cols="7">
        <h3 class="pb-4 pt-4">User Information</h3>
        <v-text-field
          v-model="user.username"
          label="Username"
          outlined
          disabled
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          disabled
        ></v-text-field>

        <v-radio-group v-model="user.position" row disabled>
          <template v-slot:label>
            <div>Role</div>
          </template>

          <v-radio label="Admin" value="Admin"></v-radio>

          <v-radio label="Customer" value="customer"></v-radio>

          <v-radio label="Shipper" value="shipper"></v-radio>
        </v-radio-group>

        <v-text-field
          v-model="user.full_name"
          label="Fullname"
          outlined
          disabled
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          label="Email"
          outlined
          disabled
        ></v-text-field>

        <v-text-field
          v-model="user.birthdate"
          label="Birthdate"
          outlined
          disabled
        ></v-text-field>

        <v-textarea
          outlined
          label="Address"
          :value="user.address"
          disabled
        ></v-textarea>

        <v-text-field
          v-model="user.phone"
          label="Phone"
          outlined
          disabled
        ></v-text-field>

        <div class="text-right p-3">
          <v-btn outlined color="#000000" @click="back()">
            <v-icon dark left>mdi-arrow-left</v-icon> Back
          </v-btn>
        </div>
      </v-col>

      <v-col cols="5">
        <h3 class="pb-4 pt-4"></h3>
        <div>
          <img
            v-if="user.avatar == ''"
            id="avatar-preview"
            src="../../../public/assets/assets/img/avatar-placeholder.png"
          />
          <img v-else id="avatar-preview" :src="`/avatar/${user.avatar}`" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data: () => ({
    previewImage: "../../../public/assets/assets/img/avatar-placeholder.png",
    // snackbar: false,
    user: {
      username: "",
      password: "",
      full_name: "",
      email: "",
      position: "customer",
      birthdate: "",
      address: "",
      phone: "",
      avatar: "",
      status: "active",
    },
    // new_avatar: "",
    // avatar_updated: false,
    // isInputActive: false,
  }),
  created() {
    this.getUserByID();
  },
  methods: {
    async getUserByID() {
      await axios
        .get(`http://localhost:5000/api/users/${this.$route.params.user_id}`)
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    back() {
      this.$router.back();
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
  background-color: #21252910;
  padding: 8px 15px;
  color: #212529;
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
