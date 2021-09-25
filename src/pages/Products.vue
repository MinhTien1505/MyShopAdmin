<template>
  <div class="container-fluid">
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table mr-1"></i>
        Product List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <div class="text-right mt-3 mb-3">
            <button class="btn btn-success" @click="addProduct()">
              Add product
            </button>
          </div>

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
                <th>Description</th>
                <th>Category</th>
                <th>Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in data" :key="product._id">
                <td>{{ product.name }}</td>
                <td>
                  {{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}đ
                </td>
                <td>
                  <v-img
                    width="180"
                    height="200px"
                    :src="`/products/${product.image}`"
                  ></v-img>
                </td>
                <td>{{ product.description }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.group }}</td>
                <td>
                  <button
                    class="btn btn-info"
                    @click="editProduct(product._id)"
                  >
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button class="btn btn-danger ml-2">
                    <i class="far fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
    };
  },
  mounted() {
    let token = JSON.parse(sessionStorage.getItem("admin_login"));
    let config = {
      headers: { Authorization: "bearer " + token },
    };
    axios
      .get("http://localhost:5000/api/getallproducts", config)
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
  methods: {
    addProduct() {
      this.$router.push({ name: "CreateProduct" });
    },
    editProduct(product_id) {
      this.$router.push({
        name: "EditProduct",
        params: { product_id: product_id },
      });
    },
  },
};
</script>

<style></style>
