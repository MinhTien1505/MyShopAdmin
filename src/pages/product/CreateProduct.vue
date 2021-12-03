<template>
  <v-card outlined>
    <v-container fluid>
      <h2>Create product</h2>
      <v-form
        class="pt-7"
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="createProduct()"
        enctype="multipart/form-data"
      >
        <v-row class="pl-2">
          <v-col cols="8">
            <v-row>
              <v-col class="label_create" cols="2">Name</v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  dense
                  v-model="product.name"
                  :rules="[(v) => !!v || 'Please enter name']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="label_create">
              <v-col cols="2">Price</v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  dense
                  :value="product.price | toNum"
                  @input="value => temp_price = value"
                  :rules="[(v) => !!v || 'Please enter price']"
                  suffix="VND"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="label_create">
              <v-col cols="2">Quantity</v-col>
              <v-col cols="10">
                <v-text-field
                  type="number"
                  min="0"
                  outlined
                  dense
                  suffix="Kg"
                  v-model="product.quantity_remaining"
                  :rules="[(v) => !!v || 'Please enter quantity']"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="label_create">
              <v-col cols="2">Calo</v-col>
              <v-col cols="10">
                <v-text-field
                  outlined
                  dense
                  v-model="product.calo"
                  :rules="[(v) => !!v || 'Please enter calo']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="label_create">
              <v-col cols="2">Category</v-col>
              <v-col cols="7">
                <v-combobox
                  dense
                  outlined
                  v-model="product.category"
                  :items="categories"
                  :rules="[(v) => !!v || 'Please select category']"
                ></v-combobox>
              </v-col>
              <v-col class="add-category" cols="3">
                <v-dialog
                  v-model="showDialog"
                  transition="dialog-bottom-transition"
                  max-width="1000px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" width="100%" v-bind="attrs" v-on="on"
                      >Add category</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-form
                      class="pt-7"
                      ref="form1"
                      width="600px"
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
              </v-col>
            </v-row>
            <v-row class="label_create">
              <v-col cols="2">Description</v-col>
              <v-col cols="10">
                <v-textarea
                  outlined
                  name="input-7-4"
                  height="90px"
                  v-model="product.description"
                  :rules="[(v) => !!v || 'Please enter description']"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <div
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage"
            ></div>
            <div class="text-center">
              <label class="upload-img" for="upload-photo"
                >Upload image here!</label
              >
              <input
                type="file"
                name="photo"
                id="upload-photo"
                accept="image/*"
                ref="fileInput"
                @input="pickFile"
                @change="selectedFile"
              />
            </div>
          </v-col>
        </v-row>
        <div class="text-center p-3">
          <v-btn color="success" type="submit" class="mr-5" elevation="2">
            <v-icon left> mdi-plus </v-icon>Create</v-btn
          >
          <v-btn
            to="/dashboard2/product-list"
            style="text-decoration: none"
            color="warning"
            elevation="2"
          >
            <v-icon left> mdi-restore </v-icon> Cancel</v-btn
          >
        </div>
      </v-form>

      <v-snackbar v-model="snackbar" :color="colorSnackbar" timeout="2000">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn icon small v-bind="attrs" @click="snackbar = false">
            <v-icon>
              mdi-close
            </v-icon>
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
    showDialog: false,
    snackbar: false,
    colorSnackbar: "",
    text: "",
    valid: false,
    valid1: false,
    previewImage: null,
    newCategory: "",
    product: {
      name: "",
      price: "0",
      quantity_remaining: "",
      description: "",
      calo: "",
      image: "",
      category: "",
      group: "",
    },
    temp_price: 0,
    categories: [],
  }),
  watch: {
    temp_price: function() {
      if (!this.temp_price) {
        console.log("Empty");
      } else {
        console.log("Change");
        let v = String(this.temp_price);
        this.product.price = v.replace(/,/g, '');
      }
    }
  },
  created() {
    this.gettAllCategory();
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    selectedFile(e) {
      this.product.image = e.target.files[0];
    },
    async createProduct() {
      if (this.$refs.form.validate()) {
        if (!this.product.image) {
          console.log(this.product);
          this.text = "Please upload product image!";
          this.colorSnackbar = "red";
          this.snackbar = true;
          return;
        }
        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };
        const formData = new FormData();
        formData.append("name", this.product.name);
        formData.append("price", this.product.price);
        formData.append("calo", this.product.calo);
        formData.append("image", this.product.image);
        formData.append("description", this.product.description);
        formData.append(
          "quantity_remaining",
          Number(this.product.quantity_remaining)
        );
        formData.append("category", this.product.category);
        formData.append("group", this.product.group);
        axios
          .post("http://localhost:5000/api/createproduct", formData, config)
          .then((res) => {
            console.log(res.data);
            this.$router.push({
              name: "ProductList",
            });
            this.$notify({
              group: "foo",
              type: "success",
              title: "Create product",
              text: "Create product successfully!",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
    cancel() {
      this.$router.push({ name: "ListProduct" });
    },
    async addCategory() {
      if (this.$refs.form1.validate()) {
        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };
        await axios
          .post(
            "http://localhost:5000/api/createcategory",
            { name: this.newCategory },
            config
          )
          .then((res) => {
            console.log(res.data);
            this.categories = [];
            this.gettAllCategory();
            this.product.category = this.newCategory;
            this.showDialog = false;
            this.text = "Added category successfully!";
            this.colorSnackbar = "success";
            this.snackbar = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
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
};
</script>

<style scoped>
.label_create {
  line-height: 45px;
}
.imagePreviewWrapper {
  width: 80%;
  height: 225px;
  display: block;
  border: 1px solid rgb(97, 179, 218);
  margin: 0 auto 10px;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
.upload-img {
  cursor: pointer;
  background-color: rgb(61, 75, 75);
  padding: 8px 15px;
  color: white;
  border-radius: 4px;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.add-category {
  line-height: 0 !important;
}
</style>
