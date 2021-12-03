<template>
  <v-container class="pa-6">
    <v-row align="center">
      <h3 class="ma-2">Need To Ship Orders</h3>
    </v-row>

    <v-row>
      <v-card data-app width="100%" class="ma-2" outlined>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="data">
          <template v-slot:item="row">
            <tr class="row-in-order">
              <td @click="goOrder(row.item._id)">
                {{ row.item._id | toCODE }}
              </td>
              <td @click="goOrder(row.item._id)">{{ row.item.full_name }}</td>
              <td @click="goOrder(row.item._id)">{{ row.item.address }}</td>
              <td @click="goOrder(row.item._id)">{{ row.item.phone }}</td>
              <td @click="goOrder(row.item._id)">
                {{ row.item.total_price | toVND }}
              </td>
              <td @click="goOrder(row.item._id)">
                <v-chip
                  v-if="row.item.status == 'Pending'"
                  class="ma-2"
                  color="#E56A5E"
                  dark
                  label
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip
                  v-if="row.item.status == 'Approved'"
                  class="ma-2"
                  color="#00D17C"
                  dark
                  label
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip
                  v-if="row.item.status == 'Pick-up'"
                  class="ma-2"
                  color="#932FEA"
                  dark
                  label
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip
                  v-if="row.item.status == 'Delivering'"
                  class="ma-2"
                  color="#0FB7BA"
                  dark
                  label
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip
                  v-if="row.item.status == 'Received'"
                  class="ma-2"
                  color="#3b8bea"
                  dark
                  label
                >
                  {{ row.item.status }}
                </v-chip>

                <v-chip
                  v-if="row.item.status == 'Cancel'"
                  class="ma-2"
                  color="#92a4a4"
                  dark
                  label
                >
                  {{ row.item.status }}
                </v-chip>
              </td>
              <td @click="goOrder(row.item._id)">
                {{ row.item.date | toDateTime }}
              </td>

              <td>
                <v-btn
                  @click="confirm(row.item._id, 'Pick-up')"
                  small
                  dark
                  color="#EACE2A"
                >
                  <v-icon left>mdi-shopping</v-icon>
                  Pick-up
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-dialog v-model="visibleDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5">
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

        <v-dialog v-model="visibleDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5">
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
              <v-btn color="green darken-1" text @click="pickup()">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-container v-if="snackbar" class="grey lighten-5">
          <v-snackbar v-model="snackbar" timeout="2000">
            {{ snackbar_text }}
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      search: "",
      headers: [
        { text: "Code", value: "_id" },
        { text: "Customer", value: "full_name" },
        { text: "Address", value: "address" },
        { text: "Phone", value: "phone" },
        { text: "Total Price", value: "total_price" },
        { text: "Status", value: "status" },
        { text: "Order at", value: "date" },
        { text: "" },
      ],

      snackbar: false,
      snackbar_text: "",

      id_selected: "",

      visibleDialog: false,
      dialogConfirm: {
        title: "",
        question: "",
        status: "",
      },
    };
  },
  mounted() {
    this.getNeedToShipOrders();
  },
  filters: {
    toCODE: function (value) {
      return "#O" + value.substring(0, 5);
    },
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
    toDateTime: function (value) {
      var date = new Date(value);
      var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Asia/Ho_Chi_Minh",
      };
      return new Intl.DateTimeFormat("en-BG", options).format(date);
    },
  },
  methods: {
    getNeedToShipOrders() {
      let status = "Approved";
      axios
        .get(`http://localhost:5000/api/getOrdersByStatus/${status}`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goOrder(order_id) {
      this.$router.push({
        name: "ShipperViewOrder",
        params: { order_id: order_id },
      });
    },
    confirm(order_id, action) {
      this.id_selected = order_id;
      this.dialogConfirm.title = `${action} Order`;
      this.dialogConfirm.question = `Are you sure you want to ${action} this Order?`;
      if (action == "Delivery") {
        this.dialogConfirm.status = "Delivering";
      } else {
        this.dialogConfirm.status = action;
      }
      this.visibleDialog = true;
    },
    async pickup() {
      let token = JSON.parse(sessionStorage.getItem("shipper_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      await axios
        .get(
          `http://localhost:5000/api/orders/pickup/${this.id_selected}`,
          config
        )
        .then((res) => {
          console.log(res);
          this.getNeedToShipOrders();
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
tr.row-in-order td:hover {
  cursor: pointer !important;
}
</style>
