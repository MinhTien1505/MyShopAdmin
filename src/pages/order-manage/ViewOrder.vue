<template>
  <v-container class="pa-6">
    <v-row align="center" no-gutters>
      <h3 class="ma-2">Order Information</h3>
      <p v-if="order.status == 'Pending'" class="order-status status-pending">
        {{ order.status }}
      </p>
      <p v-if="order.status == 'Approved'" class="order-status status-approved">
        {{ order.status }}
      </p>
      <p v-if="order.status == 'Pick-up'" class="order-status status-pick-up">
        {{ order.status }}
      </p>
      <p v-if="order.status == 'Delivering'" class="order-status status-delivering">
        {{ order.status }}
      </p>
      <p v-if="order.status == 'Received'" class="order-status status-received">
        {{ order.status }}
      </p>
      <p v-if="order.status == 'Cancel'" class="order-status status-cancel">
        {{ order.status }}
      </p>
    </v-row>
    <v-row class="ma-2">
      <v-card class="d-flex align-stretch" outlined>
        <v-col class="pa-2">
          <v-card-title>Order' Info:</v-card-title>
          <v-divider></v-divider>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Order:</v-list-item-title>
              <v-list-item-subtitle>{{
                  order._id | toCODE
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Total Price:</v-list-item-title>
              <v-list-item-subtitle>{{
                  order.total_price | toVND
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Date:</v-list-item-title>
              <v-list-item-subtitle>{{
                  order.date | toDateTime
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="pa-2">
          <v-card-title>Customer' Info:</v-card-title>
          <v-divider></v-divider>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Customer:</v-list-item-title>
              <v-list-item-subtitle>{{ order.full_name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Address:</v-list-item-title>
              <v-list-item-subtitle>{{ order.address }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Phone:</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col v-if="order.shipper" class="pa-2">
          <v-card-title>Shipper' Info:</v-card-title>
          <v-divider></v-divider>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Username:</v-list-item-title>
              <v-list-item-subtitle>{{
                  order.shipper.username
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Fullname:</v-list-item-title>
              <v-list-item-subtitle>{{
                  order.shipper.full_name
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Phone:</v-list-item-title>
              <v-list-item-subtitle>{{
                  order.shipper.phone
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-card>
    </v-row>
    <v-row class="ma-2">
      <v-card class="pa-2" width="100%" outlined tile>
        <v-col class="pa-2">
          <v-card-title>Order' Items:</v-card-title>
          <v-divider></v-divider>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">No.</th>
                  <th class="text-center">Image</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in order.orderItems" :key="item._id">
                  <td>{{ i + 1 }}</td>
                  <td align="center">
                    <img class="image-product-in-table" :src="item.product.image" />
                    <!-- </img> -->
                  </td>
                  <td>{{ item.product.name }}</td>
                  <td>{{ Number(item.price) / item.quantity | toVND }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price | toVND }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-divider></v-divider>
        <div class="text-right p-3">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="font-size: 1.25rem; font-weight: 400">Total Price:</v-list-item-title>
              <v-list-item-subtitle style="font-size: 1.75rem; font-weight: 700">{{ order.total_price | toVND }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
    </v-row>
    <v-row class="mb-6 p-3" no-gutters data-app style="justify-content: center !important">
      <v-col md="auto">
        <v-btn outlined color="#000000" @click="back()">
          <v-icon dark left>mdi-arrow-left</v-icon> Back
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn @click="confirm(order._id, 'Approved')" :dark="order.status == 'Pending'" color="#F62D51"
          :disabled="order.status != 'Pending'">
          <v-icon left>mdi-checkbox-marked-circle</v-icon>
          Approved
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn @click="confirm(order._id, 'Cancel')" :dark="order.status == 'Pending'" color="#899878"
          :disabled="order.status != 'Pending'">
          <v-icon left>mdi-cancel</v-icon>
          Cancel
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn @click="confirm(order._id, 'Delivery')" color="#EACE2A" :disabled="order.status != 'Pick-up'">
          <v-icon left>mdi-truck-fast</v-icon>
          Delivery
        </v-btn>
      </v-col>
    </v-row>
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
          <v-btn color="green darken-1" text @click="updateStatus(dialogConfirm.status)">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackbar_text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import OrderAPI from "../../api/OrderAPI";

export default {
  components: {},
  data: () => ({
    order: {
      _id: "",
      user: {
        username: "",
      },
      status: "",
      full_name: "",
      address: "",
      email: "",
      phone: "",
      total_price: "",
      orderItems: [],
      shipper: "",
    },
    snackbar: false,
    snackbar_text: "",

    id_selected: "",

    visibleDialog: false,
    dialogConfirm: {
      title: "",
      question: "",
      status: "",
    },
  }),
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
      try {
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
      } catch (error) {
        console.log(error);
        return value;
      }
    },
  },
  created() {
    this.getOrderByID();
  },
  mounted() { },
  methods: {
    async getOrderByID() {
      await OrderAPI.getById(this.$route.params.order_id)
        .then((res) => {
          this.order = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    back() {
      this.$router.back();
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
    async updateStatus(status) {
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      this.msg_snackbar = "";

      await OrderAPI.updateStatus(this.id_selected, status, config)
        .then((res) => {
          console.log(res);
          this.getOrderByID();
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
.v-btn {
  margin: 0px 8px !important;
}

.v-list-item .v-list-item__title {
  font-weight: 600;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0 16px;
}

.v-list-item__title,
.v-list-item__subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
}

/* h3 {
  text-align: center;
  margin: 0;
} */

.order-status {
  /* display: inline-block; */
  padding: 4px 12px;
  border-radius: 4px;
  color: #ffffff;
  /* line-height: 1.25em; */
  font-size: 1.2rem;
  text-transform: capitalize;
}

.status-pending {
  background-color: #e56a5e;
}

.status-approved {
  background-color: #00d17c;
}

.status-pick-up {
  background-color: #932fea;
}

.status-delivering {
  background-color: #0fb7ba;
}

.status-received {
  background-color: #3b8bea;
}

.status-cancel {
  background-color: #92a4a4;
}

.image-product-in-table {
  /* width: 98px; */
  height: 98px;
  object-fit: scale-down;
}

p {
  margin: 0;
}
</style>
