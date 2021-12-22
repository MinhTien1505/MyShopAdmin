<template>
  <div class="container-fluid pa-6">
    <v-row align="center">
      <h3 class="ma-2">Shipping Orders</h3>
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
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
  </div>
</template>

<script>
import OrderAPI from "../../api/OrderAPI";

export default {
  data() {
    return {
      overlay: true,
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
      ],
    };
  },
  mounted() {
    this.getShippingOrders();
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
    async getShippingOrders() {
      let token = JSON.parse(sessionStorage.getItem("shipper_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };
      let status = "Delivering";
      await OrderAPI.getByShipperAndStatus(status, config)
        .then((response) => {
          this.data = response.data;
          this.overlay = false;
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
  },
};
</script>

<style scoped>
tr.row-in-order td:hover {
  cursor: pointer !important;
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
</style>
