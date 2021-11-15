<template>
  <v-container class="pa-6">
    <v-row align="center">
      <!-- <v-btn @click="addGroup()" class="ma-6" 
        depressed
        color="primary">
        Create New Group
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
      <h3 class="ma-2">Manage Group</h3>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        class="ma-2 white--text"
        @click="addGroup()"
      >
        New
        <v-icon
          right
          dark
        >
          mdi-plus
        </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-card width="100%" class="ma-2" outlined>
      <v-data-table 
        :headers="headers" 
        :items="groupList" 
        item-key="_id"
        >
        <template v-slot:item="row">
          <tr >
            <td class="select-row" @click="goGroup(row.item._id)">
              <img class="image-in-table" 
                :src="`/group/${ row.item.image }`"/>
            </td>
            <td class="select-row" @click="goGroup(row.item._id)">{{ row.item.title }}</td>
            
            <td class="select-row" @click="goGroup(row.item._id)">{{ row.item.price | toVND }}</td>
            <td class="select-row" @click="goGroup(row.item._id)">{{ row.item.calo | toNum }}</td>

            <td class="select-row" @click="goGroup(row.item._id)">
              <v-chip v-if="row.item.status == 'Enable'"
                class="ma-2 pl-4 pr-4"
                color="green"
                small
                text-color="white"
              >
                {{ row.item.status }}
              </v-chip>

              <v-chip v-else
                class="ma-2 pl-4 pr-4"
                small
                text-color="white"
              >
                {{ row.item.status }}
              </v-chip>
            </td>

            <td>
              <v-btn v-if="row.item.status == 'Enable'" @click="updateStatus(row.item, 'Disable')" small dark depressed>
                <v-icon left>mdi-lock</v-icon>
                Disable
              </v-btn>
              <v-btn v-if="row.item.status == 'Disable'" @click="updateStatus(row.item, 'Enable')" small dark color="red" depressed>
                <v-icon left>mdi-lock-open-variant</v-icon>
                Enable
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      previewImage: "",
      groupList: [],
      headers: [
        { text: 'Image', value: 'image', width: "10%", align: "left" },
        { text: 'Title', value: 'title' , width: "40%", align: "left" },
        { text: 'Price', value: 'price', width: "15%", align: "left" },
        { text: 'Calo (kCal)', value: 'calo', width: "12%", align: "left" },
        { text: 'Status', value: 'status', width: "13%", align: "center" },
        { text: '', width: "10%" },
      ],
      search: "",

      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
    };
  },
  filters: {
    toVND: function(value) {
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
    toNum: function(value) {
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
    getAllGroup() {
      axios
        .get("http://localhost:5000/api/group/all")
        .then((response) => {
          this.groupList = response.data;
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

      const formData = new FormData();
      formData.append('title', group.title);
      formData.append('description', group.description);
      formData.append('price', group.price);
      formData.append('calo', group.calo);
      formData.append('material', JSON.stringify(group.material));
      formData.append('image', group.image);
      formData.append('old_image', group.image);
      formData.append('status', group.status);

      await axios
      .patch(`http://localhost:5000/api/group/update/${group._id}`, formData, config)
      .then((responese) => {
        this.text = responese.data.message;
        this.snackbar = true;
        this.getAllGroup();
      })
      .catch((error) => {
        console.log(error.message);
        this.text = error.message;
        this.snackbar = true;
      })
    }
  }
}
</script>

<style scoped>

.select-row {
  cursor: pointer;
}

.image-in-table {
  width: 64px;
  height: 64px;
  object-fit: scale-down;
}
</style>