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
                <th>Calo/100g</th>
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
                    <v-img
                      width="180"
                      height="200px"
                      :src="`/products/${product.image}`"
                    ></v-img>
                  </td>
                  <td>{{ product.description.substring(0, 100) + " ..." }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.calo }}</td>
                  <td>
                    <button
                      class="btn btn-info mb-2"
                      @click="editProduct(product._id)"
                    >
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    <button
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      @click="deleteProduct(product._id)"
                    >
                      <i class="far fa-trash-alt"></i> Delete
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
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Delete this product
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
                  <b class="title"
                    >Are you sure you want to delete this product?</b
                  >
                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button
                    class="btn btn-danger"
                    data-dismiss="modal"
                    @click="deleteByID()"
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
            color="success"
            timeout="3000"
            :multi-line="true"
            outlined
          >
            Deleted product successfully!

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
      id_delete: "",
      snackbar1: false,
    };
  },
  mounted() {
    this.getAllProduct();
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
    addProduct() {
      this.$router.push({ name: "CreateProduct" });
    },
    editProduct(product_id) {
      this.$router.push({
        name: "EditProduct",
        params: { product_id: product_id },
      });
    },
    deleteProduct(product_id) {
      this.id_delete = product_id;
    },
    async deleteByID() {
      let token = JSON.parse(sessionStorage.getItem("admin_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };
      let status = "Disable";
      const formData = new FormData();
      formData.append("status", status);
      await axios
        .patch(
          `http://localhost:5000/api/products/${this.id_delete}`,
          formData,
          config
        )
        .then((res) => {
          console.log(res);
          this.getAllProduct();
          this.snackbar1 = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
