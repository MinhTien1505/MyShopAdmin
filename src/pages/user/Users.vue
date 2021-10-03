<template>
  <!-- <div class="container-fluid"> -->
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-users"></i>
      Manage Users
      <button class="btn-create-new" @click="addUser()">
        <i class="fas fa-plus"></i>
        Create New User
      </button>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <!-- <div class="text-right mt-3 mb-3">
                        <button class="btn-create-new"  @click="addProduct()">
                            <i class="fas fa-plus"></i>
                            Create New User
                        </button>
                    </div> -->

        <table
          class="table table-bordered"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="user in data">
              <tr :key="user._id">
                <td>
                  <img
                    v-if="user.avatar == ''"
                    class="avatar-in-table"
                    src="../../../public/assets/assets/img/avatar-placeholder.png"
                  />

                  <v-img
                    v-else
                    class="avatar-in-table"
                    :src="`/avatar/${user.avatar}`"
                  ></v-img>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.full_name }}</td>

                <td>
                  <p
                    v-if="user.position == 'Admin'"
                    class="user-role role-admin"
                  >
                    {{ user.position }}
                  </p>
                  <p
                    v-if="user.position == 'customer'"
                    class="user-role role-customer"
                  >
                    {{ user.position }}
                  </p>
                  <p
                    v-if="user.position == 'shipper'"
                    class="user-role role-shipper"
                  >
                    {{ user.position }}
                  </p>
                </td>

                <td>
                  <p
                    v-if="user.status == 'active'"
                    class="user-status stt-active"
                  >
                    {{ user.status }}
                  </p>
                  <p
                    v-if="user.status == 'disable'"
                    class="user-status stt-disable"
                  >
                    {{ user.status }}
                  </p>
                </td>
                <td>
                  <div class="actions-in-table">
                    <button
                      class="btn-in-table btn-edit"
                      @click="editUser(user._id)"
                    >
                      <i class="fas fa-pencil-alt"></i> Edit
                    </button>

                    <button
                      v-if="user.status == 'active'"
                      class="btn-in-table btn-disable"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      @click="prepareModalDisable(user._id)"
                    >
                      <i class="fas fa-lock"></i> Disable
                    </button>

                    <button
                      v-if="user.status == 'disable'"
                      class="btn-in-table btn-active"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      @click="prepareModalActive(user._id)"
                    >
                      <i class="fas fa-unlock"></i> Active
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  {{ this.dataModal.title }}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <b class="title">{{ this.dataModal.question }}</b>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button
                  class="btn btn-danger"
                  data-dismiss="modal"
                  @click="updateStatus()"
                >
                  {{ this.dataModal.btn }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <v-snackbar
          v-model="snackbar"
          color="success"
          v-if="this.$route.params.message"
          timeout="3000"
          :multi-line="true"
          outlined
        >
          {{ this.$route.params.message }}

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
        <v-snackbar
          v-model="snackbar1"
          color="success"
          timeout="3000"
          :multi-line="true"
          outlined
        >
          {{ this.msg_snackbar }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="red"
              fab
              text
              v-bind="attrs"
              @click="snackbar1 = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import "datatables.net";
import "datatables.net-bs4";

import $ from "jquery";
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      snackbar: true,
      snackbar1: false,
      msg_snackbar: "",
      id_selected: "",
      dataModal: {
        title: "",
        question: "",
        btn: "",
        status: "",
      },
    };
  },
  mounted() {
    this.getAllUser();
  },
  methods: {
    getImage(name) {
      if (name == "") {
        // return "@/public/assets/assets/img/account-image-placeholder.jpg";
        return "../../public/assets/assets/img/error-404-monochrome.svg";
      } else {
        return `/avatar/${name}`;
      }
    },
    getAllUser() {
      axios
        .get("http://localhost:5000/api/allUsers")
        .then((response) => {
          this.data = response.data;
          $(document).ready(function() {
            $("#dataTable").DataTable({
              columnDefs: [
                { width: "6%", targets: 0 },
                { width: "20%", targets: 1 },
                { width: "27%", targets: 2 },
                { width: "10%", targets: 3 },
                { width: "10%", targets: 4 },
                { width: "27%", targets: 5 },
              ],
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addUser() {
      this.$router.push({ name: "CreateUser" });
    },
    editUser(user_id) {
      this.$router.push({
        name: "EditUser",
        params: { user_id: user_id },
      });
    },
    prepareModalDisable(user_id) {
      this.id_selected = user_id;
      this.dataModal.title = "Disable User";
      this.dataModal.question = "Are you sure you want to disable this user?";
      this.dataModal.btn = "Disable";
      this.dataModal.status = "disable";
    },
    prepareModalActive(user_id) {
      this.id_selected = user_id;
      this.dataModal.title = "Active User";
      this.dataModal.question = "Are you sure you want to active this user?";
      this.dataModal.btn = "Active";
      this.dataModal.status = "active";
    },
    async updateStatus() {
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      // let status = "disable";
      // const formData = new FormData();
      // formData.append("status", status);
      // console.log(formData.getAll('status'));

      this.msg_snackbar = "";
      await axios
        .patch(
          `http://localhost:5000/api/updateUserStatus/${this.id_selected}`,
          { status: this.dataModal.status },
          config
        )
        .then((res) => {
          console.log(res);

          if (this.dataModal.status == "disable") {
            this.msg_snackbar = "User Disabled Successfully!";
          } else if (this.dataModal.status == "active") {
            this.msg_snackbar = "User Activated Successfully!";
          }

          this.getAllUser();
          this.snackbar1 = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.btn-create-new {
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #04aa6d;
  color: #ffffff;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
}

.btn-create-new i {
  padding-right: 8px;
}

.avatar-in-table {
  width: 37px;
  height: 37px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.card {
  border: none;
}

.card-body {
  padding: 0 1.5rem;
}

.card-header {
  font-size: 24px;
  font-weight: 600;
  background: none;
  border: none;
  padding: 1rem 1.5rem;
}

.card-header i {
  padding-right: 8px;
}

.user-role {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  color: #ffffff;
  /* line-height: 1.25em; */
  font-size: 0.9em;
  text-transform: capitalize;
}

.role-admin {
  background-color: #932fea;
}

.role-customer {
  background-color: #f5ab0c;
}

.role-shipper {
  background-color: #3b8bea;
}

.user-status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  color: #ffffff;
  /* line-height: 1.25em; */
  font-size: 0.9em;
  text-transform: capitalize;
}

.stt-active {
  background-color: #00bb9c;
}

.stt-disable {
  background-color: #92a4a4;
}

.actions-in-table {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* .btn-in-table {
        padding: 4px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: #ffffff;
    } */

.btn-in-table {
  padding: 4px 12px;
  /* width: 32px;
        height: 32px; */
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.9em;
}

.btn-in-table i {
  /* width: 20px;
        height: 20px; */
  font-size: 1em;
  padding-right: 4px;
}

.btn-edit {
  background-color: #009efb;
}

.btn-disable {
  background-color: #ff6c65;
}

.btn-active {
  background-color: #47d0be;
}
</style>
