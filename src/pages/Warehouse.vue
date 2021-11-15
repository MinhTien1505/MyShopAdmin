<template>
  <div class="container-fluid">
    <loading-overlay
      :active="isLoading"
      :is-full-page="true"
      :loader="loader"
      :opacity="opacity"
      :width="width"
      :height="height"
      background-color="#C0C0C0"
    />
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table mr-1"></i>
        Warehouse
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Status</th>
                <th>Quantity remaining</th>
                <th>Quantity sold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in data">
                <tr v-if="product.status == `Enable`" :key="product._id">
                  <td>{{ product.name }}</td>
                  <td>
                    {{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}đ
                  </td>
                  <td>
                    <div class="text-center">
                      <v-img
                        width="180px"
                        height="200px"
                        :src="`/products/${product.image}`"
                      ></v-img>
                    </div>
                  </td>
                  <td>
                    <p
                      v-if="
                        !product.quantity_remaining ||
                          product.quantity_remaining == 0
                      "
                      class="text-danger text-uppercase font-weight-bold"
                    >
                      Out of stock
                    </p>
                    <p
                      v-else
                      class="text-success text-uppercase font-weight-bold"
                    >
                      In stock
                    </p>
                  </td>
                  <td>
                    <p class="text-center">{{ product.quantity_remaining }}</p>
                  </td>
                  <td>
                    <p class="text-center">{{ product.quantity_sold }}</p>
                  </td>
                  <td>
                    <button
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      class="btn btn-success mb-2"
                      @click="add(product._id, product.quantity_remaining)"
                    >
                      <i class="fas fa-plus"></i> Add quantity
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Add product quantity
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <b class="title">Please enter the amount you want to add</b>
                  <div class="form-group mt-3">
                    <input
                      type="number"
                      class="form-control"
                      v-model="quantity_input"
                      min="0"
                      step="1"
                      oninput="validity.valid||(value='');"
                      required
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button
                    class="btn btn-success"
                    data-dismiss="modal"
                    @click="addQuantity()"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <v-snackbar
            v-model="snackbar"
            color="success"
            v-if="this.$route.params.message"
            timeout="3000"
            :multi-line="true"
            outlined
          >
            {{ this.$route.params.message }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="red"
                fab
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar
            v-model="snackbar1"
            timeout="3000"
            :multi-line="true"
            outlined
          >
            <p class="text-success">Add product quantity successfully!</p>
            <template v-slot:action="{ attrs }">
              <v-btn
                color="red"
                fab
                text
                v-bind="attrs"
                @click="snackbar1 = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "datatables.net";
import "datatables.net-bs4";

import $ from "jquery";
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      snackbar: true,
      quantity_input: 0,
      id_add: "",
      quantity: 0,
      snackbar1: false,
      isLoading: true,
      loader: "spinner",
      opacity: 1,
      width: 100,
      height: 100,
    };
  },
  mounted() {
    this.getAllProduct();
    this.isLoading = false;
  },
  methods: {
    getAllProduct() {
      axios
        .get("http://localhost:5000/api/getallproducts")
        .then((response) => {
          this.data = response.data;
          $(document).ready(function() {
            $("#dataTable").DataTable();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add(product_id, quantity_remaining) {
      this.id_add = product_id;
      this.quantity = quantity_remaining;
    },
    async addQuantity() {
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };
      let quantity_remaining =
        Number(this.quantity) + Number(this.quantity_input);
      const formData = new FormData();

      formData.append("quantity_remaining", quantity_remaining);

      await axios
        .patch(
          `http://localhost:5000/api/products/${this.id_add}`,
          formData,
          config
        )
        .then((res) => {
          console.log(res);
          this.getAllProduct();
          this.snackbar1 = true;
          this.quantity_input = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
table.dataTable thead > tr > th.sorting_asc,
table.dataTable thead > tr > th.sorting_desc,
table.dataTable thead > tr > th.sorting,
table.dataTable thead > tr > td.sorting_asc,
table.dataTable thead > tr > td.sorting_desc,
table.dataTable thead > tr > td.sorting {
  text-align: center;
}
</style>
