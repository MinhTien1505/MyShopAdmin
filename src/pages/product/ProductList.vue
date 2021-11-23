<template>
  <v-card class="mt-3">
    <v-card-title>
      <h2>Product List</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-container fluid class="aaaaa">
      <div class="text-right">
        <v-btn
          color="success"
          class="white--text"
          to="/dashboard2/create-product"
        >
          <v-icon left dark>
            mdi-plus
          </v-icon>
          New product
        </v-btn>
      </div>
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
            <template v-slot:[`item.description`]="{ item }">
              {{ item.description.substring(0, 100) + " ..." }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                small
                dark
                color="primary"
                depressed
                @click="editProduct(item)"
              >
                <v-icon left>mdi-pencil</v-icon>
                Edit {{ item.action }}
              </v-btn>
              <v-btn
                class="mt-2"
                small
                dark
                color="red"
                depressed
                @click="updateStatus(item)"
              >
                <v-icon left>mdi-delete</v-icon>
                Delete {{ item.action }}
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
        color="success"
        :multi-line="true"
        timeout="2000"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" fab text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        v-model="snackbar1"
        color="success"
        v-if="this.$route.params.message"
        timeout="2000"
        multi-line="true"
      >
        {{ this.$route.params.message }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" fab text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    overlay: true,
    showDialog: false,
    search: "",
    text: "",
    snackbar: false,
    snackbar1: true,
    products: [],
    headers: [
      { text: "NAME", align: "start", width: "12%", value: "name" },
      { text: "PRICE", align: "start", width: "12%", value: "price" },
      { text: "IMAGE", align: "center", width: "12%", value: "image" },
      {
        text: "DESCRIPTION",
        align: "start",
        width: "25%",
        value: "description",
      },
      { text: "CATEGORY", align: "start", width: "12%", value: "category" },
      { text: "CALO/100G", align: "start", width: "12%", value: "calo" },
      { text: "ACTION", align: "center", width: "12%", value: "action" },
    ],
  }),
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
  methods: {
    async getAllProduct() {
      await axios
        .get("http://localhost:5000/api/getallproducts")
        .then((response) => {
          this.products = response.data.filter(
            (item) => item.status == "Enable"
          );
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateStatus(item) {
      this.$confirm(
        "Are you sure you want to delete this product?",
        "Delete product",
        "question"
      ).then(() => {
        let status = "Disable";
        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };
        const formData = new FormData();
        formData.append("status", status);
        axios
          .patch(
            `http://localhost:5000/api/products/${item._id}`,
            formData,
            config
          )
          .then((res) => {
            console.log(res);
            this.getAllProduct();
            this.showDialog = false;
            this.snackbar = true;
            this.text = "Deleted product successfully!";
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    editProduct(value) {
      const id = value._id;
      this.$router.push(`/dashboard2/product-list/${id}`);
    },
  },
  created() {
    this.getAllProduct();
  },
};
</script>

<style>
.aaaaa {
  width: 100%;
}
</style>
