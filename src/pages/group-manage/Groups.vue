<template>
  <div class="container-fluid pa-6">
    <v-row align="center">
      <h3 class="ma-2">Manage Group</h3>
      <v-spacer></v-spacer>
      <v-btn color="success" class="ma-2 white--text" @click="addGroup()">
        New
        <v-icon right dark> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-card width="100%" class="ma-2" outlined>
        <v-data-table :headers="headers" :items="groupList" item-key="_id">
          <template v-slot:item="row">
            <tr>
              <td class="select-row" @click="goGroup(row.item._id)">
                <img class="image-in-table" :src="row.item.image" />
              </td>
              <td class="select-row" @click="goGroup(row.item._id)">
                {{ row.item.title }}
              </td>

              <td class="select-row" @click="goGroup(row.item._id)">
                {{ row.item.price | toVND }}
              </td>
              <td class="select-row" @click="goGroup(row.item._id)">
                {{ row.item.calo | toNum }}
              </td>

              <td class="select-row" @click="goGroup(row.item._id)">
                <v-chip
                  v-if="row.item.status == 'Enable'"
                  class="ma-2 pl-4 pr-4"
                  color="green"
                  small
                  text-color="white"
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip v-else class="ma-2 pl-4 pr-4" small text-color="white">
                  {{ row.item.status }}
                </v-chip>
              </td>

              <td>
                <v-btn
                  v-if="row.item.status == 'Enable'"
                  @click="updateStatus(row.item, 'Disable')"
                  small
                  dark
                  depressed
                >
                  <v-icon left>mdi-lock</v-icon>
                  Disable
                </v-btn>
                <v-btn
                  v-if="row.item.status == 'Disable'"
                  @click="updateStatus(row.item, 'Enable')"
                  small
                  dark
                  color="red"
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
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
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
import GroupAPI from "../../api/GroupAPI";
export default {
  data() {
    return {
      overlay: true,
      previewImage: "",
      groupList: [],
      headers: [
        { text: "Image", value: "image", width: "10%", align: "left" },
        { text: "Title", value: "title", width: "40%", align: "left" },
        { text: "Price", value: "price", width: "15%", align: "left" },
        { text: "Calo (kCal)", value: "calo", width: "12%", align: "left" },
        { text: "Status", value: "status", width: "13%", align: "center" },
        { text: "", width: "10%" },
      ],
      search: "",

      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,
    };
  },
  filters: {
    toVND: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
      }
      var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    toNum: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
      }
      var formatter = new Intl.NumberFormat();
      return formatter.format(value);
    },
  },
  created() {
    this.getAllGroup();
  },
  methods: {
    addGroup() {
      this.$router.push({ name: "CreateGroup" });
    },
    async getAllGroup() {
      await GroupAPI.get_all()
        .then((response) => {
          this.groupList = response.data.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goGroup(group_id) {
      this.$router.push({
        name: "ViewGroup",
        params: { group_id: group_id },
      });
    },
    async updateStatus(group, new_status) {
      group.status = new_status;

      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      // const formData = new FormData();
      // formData.append("title", group.title);
      // formData.append("description", group.description);
      // formData.append("price", group.price);
      // formData.append("calo", group.calo);
      // formData.append("material", JSON.stringify(group.material));
      // formData.append("image", group.image);
      // formData.append("old_image", group.image);
      // formData.append("status", group.status);

      group.material = JSON.stringify(group.material);
      console.log(group);

      await GroupAPI.update(group._id, group, config)
        .then((res) => {
          this.text = res.data.message;
          this.snackbar = true;
          this.getAllGroup();
        })
        .catch((error) => {
          console.log(error.message);
          this.text = error.message;
          this.snackbar = true;
        });
    },
  },
};
</script>

<style scoped>
.select-row {
  cursor: pointer;
}

.image-in-table {
  width: 150px;
  height: 120px;
}
</style>
