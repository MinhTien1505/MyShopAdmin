<template>
  <div class="container-fluid pa-6">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row align="center">
      <h3 class="ma-2">Manage Group</h3>
    </v-row>

    <v-row>
      <v-card width="100%" class="ma-2" outlined>
        <v-tabs background-color="primary" dark>
          <v-tab>All</v-tab>
          <v-tab>Pending</v-tab>
          <v-tab>Approved</v-tab>
          <v-tab>Pick-up</v-tab>
          <v-tab>Delivering</v-tab>
          <v-tab>Received</v-tab>
          <v-tab>Cancel</v-tab>

          <v-tab-item>
            <TabOrder
              :action="true"
              :orders="data"
              @update-order="getAllOrders"
            />
          </v-tab-item>

          <v-tab-item>
            <TabOrder
              :action="true"
              :orders="pendingOrder"
              @update-order="getAllOrders"
            />
          </v-tab-item>

          <v-tab-item>
            <TabOrder :orders="approvedOrder" @update-order="getAllOrders" />
          </v-tab-item>

          <v-tab-item>
            <TabOrder
              :action="true"
              :orders="pickUpOrder"
              @update-order="getAllOrders"
            />
          </v-tab-item>

          <v-tab-item>
            <TabOrder :orders="deliveringOrder" @update-order="getAllOrders" />
          </v-tab-item>

          <v-tab-item>
            <TabOrder :orders="receivedOrder" @update-order="getAllOrders" />
          </v-tab-item>

          <v-tab-item>
            <TabOrder :orders="cancelOrder" @update-order="getAllOrders" />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import TabOrder from "../../components/TabOrder.vue";
import OrderAPI from "../../api/OrderAPI";

export default {
  components: {
    TabOrder,
  },
  data() {
    return {
      overlay: false,
      data: [],
    };
  },
  computed: {
    pendingOrder() {
      return this.data.filter((item) => item.status == "Pending");
    },
    approvedOrder() {
      return this.data.filter((item) => item.status == "Approved");
    },
    pickUpOrder() {
      return this.data.filter((item) => item.status == "Pick-up");
    },
    deliveringOrder() {
      return this.data.filter((item) => item.status == "Delivering");
    },
    receivedOrder() {
      return this.data.filter((item) => item.status == "Received");
    },
    cancelOrder() {
      return this.data.filter((item) => item.status == "Cancel");
    },
  },
  mounted() {
    this.getAllOrders();
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
    async getAllOrders() {
      this.overlay = true;
      await OrderAPI.get()
        .then((response) => {
          this.data = response.data;
          this.overlay = false;
        })
        .catch((err) => {
          console.log(err);
          this.overlay = false;
        });
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
}

.card-body {
  padding: 0 1.5rem;
}
</style>
