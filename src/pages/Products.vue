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
        Product List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <div class="d-flex justify-content-between mb-2">
            <div class="row">
              <div class="col-6">
                <div class="form-group w-50">
                  <label for="sel1">Select category:</label>
                  <select
                    class="form-control"
                    id="sel1"
                    @change="changeCategory($event.target.value)"
                  >
                    <option>ALL</option>
                    <option
                      v-for="item in categories"
                      :value="item"
                      :key="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <div class="text-right">
                  <button class="btn btn-success" @click="addProduct()">
                    <i class="fas fa-plus-circle"></i>
                    Add product
                  </button>
                </div>
              </div>
            </div>
          </div>

          <table
            class="table table-bordered"
            id="dataTable"
            width="100%"
            ref="formContainer"
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
      id_delete: "",
      isLoading: true,
      loader: "spinner",
      opacity: 1,
      width: 100,
      height: 100,
      categories: [],
      fullPage: false,
    };
  },
  mounted() {
    this.getAllProduct();
    this.isLoading = false;
  },
  created() {
    this.gettAllCategory();
  },
  methods: {
    changeCategory(value) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });
      if (value == "ALL") {
        this.getAllProduct().then((res) => {
          console.log(res);
          loader.hide();
        });
        return;
      }
      this.getAllProduct().then((res) => {
        console.log(res);
        this.data = this.data.filter((item) => item.category == value);
        loader.hide();
      });
    },
    async gettAllCategory() {
      await axios
        .get("http://localhost:5000/api/getallcategory")
        .then((res) => {
          for (let item of res.data) {
            this.categories.push(item.name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAllProduct() {
      await axios
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
          this.$notify({
            group: "foo",
            type: "success",
            title: "Delete product",
            text: "Deleted product successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
