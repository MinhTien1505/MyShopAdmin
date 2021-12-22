<template>
  <!-- <div class="container-fluid"> -->

  <div class="container-fluid pa-6">
    <v-row align="center">
      <h3 class="ma-2">Manage Users</h3>
      <v-spacer></v-spacer>
      <v-btn color="success" class="ma-2 white--text" @click="addUser()">
        New
        <v-icon right dark> mdi-plus </v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-card width="100%" class="ma-2" outlined>
        <v-data-table :headers="headers" :items="data" item-key="_id">
          <template v-slot:item="row">
            <tr>
              <td class="select-row" @click="viewUser(row.item._id)">
                <img
                  v-if="row.item.avatar == ''"
                  class="avatar-in-table"
                  src="../../../public/assets/assets/img/avatar-placeholder.png"
                />

                <v-img
                  v-else
                  class="avatar-in-table"
                  :src="`/avatar/${row.item.avatar}`"
                ></v-img>
              </td>
              <td class="select-row" @click="viewUser(row.item._id)">
                {{ row.item.username }}
              </td>

              <td class="select-row" @click="viewUser(row.item._id)">
                {{ row.item.full_name }}
              </td>

              <td class="select-row" @click="viewUser(row.item._id)">
                <v-chip
                  v-if="row.item.position == 'Admin'"
                  class="ma-2 pl-4 pr-4"
                  color="red"
                  text-color="white"
                >
                  {{ row.item.position }}
                </v-chip>
                <v-chip
                  v-if="row.item.position == 'customer'"
                  class="ma-2 pl-4 pr-4"
                  color="amber"
                  text-color="white"
                >
                  {{ row.item.position }}
                </v-chip>
                <v-chip
                  v-if="row.item.position == 'shipper'"
                  class="ma-2 pl-4 pr-4"
                  color="blue"
                  text-color="white"
                >
                  {{ row.item.position }}
                </v-chip>
              </td>

              <td class="select-row" @click="viewUser(row.item._id)">
                <v-chip
                  v-if="row.item.status == 'active'"
                  class="ma-2 pl-4 pr-4"
                  color="green"
                  text-color="white"
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip
                  v-else
                  class="ma-2 pl-4 pr-4"
                  color="black"
                  text-color="white"
                >
                  {{ row.item.status }}
                </v-chip>
              </td>

              <td>
                <v-btn
                  v-if="row.item.status == 'active'"
                  @click="confirm(row.item._id, 'disable')"
                  dark
                  depressed
                >
                  <v-icon left>mdi-lock</v-icon>
                  Disable
                </v-btn>
                <v-btn
                  v-if="row.item.status == 'disable'"
                  @click="confirm(row.item._id, 'active')"
                  dark
                  color="success"
                  depressed
                >
                  <v-icon left>mdi-lock-open-variant</v-icon>
                  Enable
                </v-btn>
              </td>
            </tr>
          </template>

          <template v-slot:no-data>
            <v-overlay :value="overlay">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
          </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="visibleDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="font-weight-bold text-uppercase">
            {{ dialogConfirm.title }}
          </v-card-title>

          <v-card-text>
            {{ dialogConfirm.question }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="visibleDialog = false">
              Disagree
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="updateStatus(dialogConfirm.status)"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ snackbar_text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </div>
</template>

<script>
import UserAPI from "../../api/UserAPI";

export default {
  data() {
    return {
      data: [],
      overlay: true,
      headers: [
        { text: "Avatar", value: "avatar", width: "10%", align: "left" },
        { text: "Username", value: "username", width: "25%", align: "left" },
        { text: "Fullname", value: "full-name", width: "30%", align: "left" },
        { text: "Role", value: "role", width: "15%", align: "left" },
        { text: "Status", value: "status", width: "10%", align: "center" },
        { text: "", width: "10%" },
      ],
      search: "",

      id_selected: "",

      visibleDialog: false,
      dialogConfirm: {
        title: "",
        question: "",
        status: "",
      },

      snackbar: false,
      snackbar_text: "",
      timeout: 2000,
    };
  },
  mounted() {
    this.getAllUser();
    this.isLoading = false;
  },
  methods: {
    getImage(name) {
      if (name == "") {
        return "../../public/assets/assets/img/error-404-monochrome.svg";
      } else {
        return `/avatar/${name}`;
      }
    },
    async getAllUser() {
      await UserAPI.get_all()
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addUser() {
      this.$router.push({ name: "CreateUser" });
    },
    viewUser(user_id) {
      this.$router.push({
        name: "ViewUser",
        params: { user_id: user_id },
      });
    },
    confirm(id, action) {
      this.id_selected = id;
      this.dialogConfirm.title = `${action} User`;
      this.dialogConfirm.question = `Are you sure you want to ${action} this User?`;
      this.dialogConfirm.status = action;
      this.visibleDialog = true;
    },
    async updateStatus(status) {
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      this.msg_snackbar = "";

      await UserAPI.updateStatus(this.id_selected, status, config)
        .then((res) => {
          console.log(res);
          this.getAllUser();
          this.visibleDialog = false;
          this.snackbar_text = `${this.dialogConfirm.title} Successfully!`;
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.select-row {
  cursor: pointer;
}

.avatar-in-table {
  width: 45px;
  height: 45px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.user-role {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  color: #ffffff;
  /* line-height: 1.25em; */
  font-size: 0.9rem;
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
