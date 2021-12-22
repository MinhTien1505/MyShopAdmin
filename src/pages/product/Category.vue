<template>
  <v-card class="mt-3">
    <v-card-title>
      <h2>Category List</h2>
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
      <div class="text-right pa-3">
        <v-dialog
          v-model="showDialog"
          transition="dialog-bottom-transition"
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on"
              >+ Add category</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-form
              class="pt-7"
              ref="form1"
              v-model="valid1"
              lazy-validation
              @submit.prevent="addCategory()"
            >
              <v-card>
                <v-toolbar color="primary" dark>Add category</v-toolbar>
                <v-card-text>
                  <v-text-field
                    v-model="newCategory"
                    :rules="[(v) => !!v || 'Please enter new category']"
                    label="New category"
                    required
                  ></v-text-field>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn color="red" text @click="dialog.value = false"
                    >Close</v-btn
                  >
                  <v-btn color="green darken-1" text type="submit"
                    >Create</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-form>
          </template>
        </v-dialog>
      </div>
      <v-row class="mt-1">
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="body"
            :search="search"
            sort-by="calories"
            max-witdh="100%"
            class="elevation-2 mytable"
          >
            <template v-slot:[`item.product_quantity`]="{ item }">
              <h5>{{ item.product_quantity }}</h5>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                color="info"
                class="ma-2 white--text"
                @click="detail(item)"
              >
                <v-icon left dark> mdi-view-list </v-icon>
                Detail
              </v-btn>
              <v-btn
                color="error"
                class="ma-2 white--text"
                @click="deleteCategory(item)"
              >
                <v-icon left dark> mdi-delete </v-icon>
                Detele
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
        timeout="3000"
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
import CategoryAPI from "../../api/CategoryAPI";
import ProductAPI from "../../api/ProductAPI";

export default {
  data: () => ({
    valid: false,
    overlay: true,
    showDialog: false,
    snackbar: false,
    search: "",
    text: "",
    newCategory: "",
    colorSnackbar: "success",
    products: [],
    categories: [],
    body: [],
    headers: [
      { text: "NAME", align: "start", value: "name" },
      { text: "PRODUCT_QUANTITY", align: "center", value: "product_quantity" },
      { text: "ACTION", align: "center", value: "action" },
    ],
  }),
  methods: {
    async getAllProduct() {
      ProductAPI.get()
      .then((response) => {
        this.products = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    async getAllCategory() {
      this.categories = [];
      CategoryAPI.get()
      .then((res) => {
        this.categories = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    async addCategory() {
      if (this.$refs.form1.validate()) {
        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };

        CategoryAPI.create(this.newCategory, config)
          .then((res) => {
            console.log(res.data);
            this.body = [];
            this.getAllCategory().then((res) => {
              console.log(res);
              this.handleCategory();
            });
            this.showDialog = false;
            this.newCategory = "";
            this.text = "Added category successfully!";
            this.colorSnackbar = "success";
            this.snackbar = true;
          })
          .catch((err) => {
            console.log(err);
            this.text = "Added category fail!";
            this.colorSnackbar = "error";
            this.snackbar = true;
          });
      }
    },
    handleCategory() {
      for (let category of this.categories) {
        let count = 0;
        for (let product of this.products) {
          if (category.name == product.category) {
            count++;
          }
        }
        this.body.push({
          id: category._id,
          name: category.name,
          product_quantity: count,
        });
      }
    },
    async deleteCategory(item) {
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };
      this.$confirm(
        "Are you sure you want to delete category?",
        "Delete",
        "question"
      ).then(() => {

        CategoryAPI.delete(item.id, config)
        .then((res) => {
          console.log(res);
          this.body = [];
          this.getAllCategory().then((res) => {
            console.log(res);
            this.handleCategory();
          });
          this.text = "Deleted category successfully!";
          this.colorSnackbar = "success";
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },
    detail(item) {
      this.$router.push(`category/${item.name}`);
    },
  },
  created() {
    this.getAllProduct().then((res) => {
      console.log(res);
      this.getAllCategory().then((res) => {
        console.log(res);
        this.handleCategory();
      });
    });
  },
};
</script>

<style></style>
