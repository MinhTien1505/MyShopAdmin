<template>
  <v-card class="mt-3">
    <v-card-title>
      <h2>Ware Hourse</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <div class="container-fluid">
      <v-row class="mt-1">
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="products"
            :search="search"
            sort-by="calories"
            max-witdh="100%"
            class="elevation-2 mytable"
          >
            <template v-slot:[`item.price`]="{ item }">
              {{ item.price | toVND }}
            </template>
            <template v-slot:[`item.image`]="{ item }">
              <v-img
                width="150px"
                height="150px"
                :src="`/products/${item.image}`"
              >
              </v-img>
            </template>
            <template v-slot:[`item.quantity`]="{ item }">
              <v-chip
                v-if="item.quantity_remaining == 0"
                class="ma-2 pl-4 pr-4"
                color="red"
                small
                text-color="white"
              >
                OUT OF STOCK
              </v-chip>

              <v-chip
                v-else
                class="ma-2 pl-4 pr-4"
                small
                color="green"
                text-color="white"
              >
                IN STOCK
              </v-chip>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                color="success"
                class="ma-2 white--text"
                @click="addQuantity(item)"
              >
                <v-icon left dark> mdi-plus </v-icon>
                Add quantity
              </v-btn>
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
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        :color="colorSnackbar"
        :multi-line="true"
        timeout="2000"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn fab text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    overlay: true,
    snackbar: false,
    search: "",
    text: "",
    colorSnackbar: "success",
    products: [],
    headers: [
      { text: "NAME", align: "start", width: "15%", value: "name" },
      { text: "PRICE", align: "start", width: "15%", value: "price" },
      { text: "IMAGE", align: "center", width: "14%", value: "image" },
      {
        text: "STATUS",
        align: "center",
        width: "14%",
        value: "quantity",
      },
      {
        text: "QUANTITY REMAINING",
        align: "center",
        width: "15%",
        value: "quantity_remaining",
      },
      {
        text: "QUANTITY SOLD",
        align: "center",
        width: "12%",
        value: "quantity_sold",
      },
      { text: "ACTION", align: "center", width: "15%", value: "action" },
    ],
  }),
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
  methods: {
    async getAllProduct() {
      await axios
        .get("http://localhost:5000/api/getallproducts")
        .then((response) => {
          this.products = response.data.filter(
            (item) => item.status == "Enable"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addQuantity(item) {
      this.$prompt("Enter quantity you want to add").then((text) => {
        const number = Number(text);
        if (!isNaN(number)) {
          let token = JSON.parse(sessionStorage.getItem("admin_login"));
          let config = {
            headers: { Authorization: "bearer " + token },
          };
          let quantity_remaining = Number(item.quantity_remaining) + number;
          const formData = new FormData();

          formData.append("quantity_remaining", quantity_remaining);

          axios
            .patch(
              `http://localhost:5000/api/products/${item._id}`,
              formData,
              config
            )
            .then((res) => {
              console.log(res);
              this.getAllProduct();
              this.colorSnackbar = "success";
              this.text = "Added quantity successfully!";
              this.snackbar = true;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.colorSnackbar = "error";
          this.text = "Please enter a number!";
          this.snackbar = true;
        }
      });
    },
  },
  created() {
    this.getAllProduct();
  },
};
</script>

<style></style>
