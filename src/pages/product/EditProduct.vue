<template>
  <v-container fluid>
    <h2>Update product</h2>
    <v-form class="pt-7" ref="form" v-model="valid" lazy-validation @submit.prevent="updateProduct()"
      enctype="multipart/form-data">
      <v-row class="pl-2">
        <v-col cols="8">
          <v-row>
            <v-col class="label_create" cols="2">Name</v-col>
            <v-col cols="10">
              <v-text-field outlined dense v-model="product.name" :rules="[(v) => !!v || 'Please enter name']">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="label_create">
            <v-col cols="2">Price</v-col>
            <v-col cols="10">
              <v-text-field outlined dense disabled :value="product.price | toNum"
                @input="(value) => (temp_price = value)" :rules="[(v) => !!v || 'Please enter price']" suffix="vnd">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="label_create">
            <v-col cols="2">Unit</v-col>
            <v-col cols="10">
              <v-text-field outlined dense disabled v-model="product.unit"
                :rules="[(v) => !!v || 'Please enter unit of product']"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="label_create">
            <v-col cols="2">Calo</v-col>
            <v-col cols="10">
              <v-text-field outlined dense v-model="product.calo" :rules="[(v) => !!v || 'Please enter calo']">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="label_create">
            <v-col cols="2">EXP</v-col>
            <v-col cols="10">
              <v-menu ref="menu" v-model="datePickerMenu" :close-on-content-click="false"
                :return-value.sync="product.exp" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="product.exp" label="Picker a date" outlined dense prepend-icon="mdi-calendar"
                    readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="product.exp" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(product.exp)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row class="label_create">
            <v-col cols="2">Category</v-col>
            <v-col cols="8">
              <v-combobox dense outlined v-model="product.category" :items="categories"
                :rules="[(v) => !!v || 'Please select category']"></v-combobox>
            </v-col>
            <v-col class="add-category" cols="2">
              <v-dialog v-model="showDialog" transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" width="100%" v-bind="attrs" v-on="on">Add category</v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-form class="pt-7" ref="form1" v-model="valid1" lazy-validation @submit.prevent="addCategory()">
                    <v-card>
                      <v-toolbar color="primary" dark>Add category</v-toolbar>
                      <v-card-text>
                        <v-text-field v-model="newCategory" :rules="[(v) => !!v || 'Please enter new category']"
                          label="New category" required></v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn color="red" text @click="dialog.value = false">Close</v-btn>
                        <v-btn color="green darken-1" text type="submit">Create</v-btn>
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
              <v-textarea outlined name="input-7-4" height="90px" v-model="product.description"
                :rules="[(v) => !!v || 'Please enter description']"></v-textarea>
            </v-col>
          </v-row>

          <v-row class="label_create">
            <v-col cols="2">Discount</v-col>
            <v-col cols="2">
              <v-select :disabled="!product.on_sale" v-model="product.discount_type" :items="discount_type_items" dense
                outlined></v-select>
            </v-col>

            <v-col cols="5">
              <v-text-field :disabled="!product.on_sale" outlined dense v-model="product.discount"
                :rules="[(v) => !product.on_sale || !!v || 'Please enter a discount number']"></v-text-field>
            </v-col>

            <v-col cols="2">On Sale</v-col>
            <v-col cols="1">
              <v-switch v-model="product.on_sale" inset></v-switch>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage">
            <v-img v-if="product.image" :src="product.image" width="100%" height="100%" :class="{ showImage: show }">
            </v-img>
          </div>
          <div class="text-center">
            <label class="upload-img" for="upload-photo">Upload image here!</label>
            <input type="file" name="photo" id="upload-photo" accept="image/*" ref="fileInput" @input="pickFile"
              @change="selectedFile" />
          </div>
        </v-col>
      </v-row>
      <div class="text-center p-3">
        <v-btn color="success" type="submit" class="mr-5" elevation="2">
          <v-icon left> mdi-update </v-icon>Update
        </v-btn>
        <v-btn @click="cancel()" style="text-decoration: none" color="warning" elevation="2">
          <v-icon left> mdi-restore </v-icon> Cancel
        </v-btn>
      </div>
    </v-form>

    <v-snackbar v-model="snackbar" :color="colorSnackbar" timeout="2000">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn icon small v-bind="attrs" @click="snackbar = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import ProductAPI from "../../api/ProductAPI";
import CategoryAPI from "../../api/CategoryAPI";
import uploadFileToCloudinary from "../../common/function";

export default {
  data: () => ({
    showDialog: false,
    overlay: false,
    snackbar: false,
    show: false,
    colorSnackbar: "",
    text: "",
    valid: false,
    valid1: false,
    previewImage: null,
    newCategory: "",
    newImage: "",
    datePickerMenu: false,
    discount_type_items: ["%", "VND"],
    product: {
      name: "",
      price: "",
      unit: "kg",
      exp: "",
      quantity_remaining: "",
      description: "",
      calo: "",
      image: "",
      category: "",
      on_sale: false,
      discount_type: "%",
      discount: 0,
      group: "",
    },
    temp_price: 0,
    categories: [],
  }),
  watch: {
    temp_price: function () {
      if (!this.temp_price) {
        console.log("Empty");
      } else {
        console.log("Change");
        let v = String(this.temp_price);
        this.product.price = v.replace(/,/g, "");
      }
    },
  },
  created() {
    this.getAllCategory();
    this.getProduct();
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
      this.show = true;
      this.newImage = e.target.files[0];
    },
    async updateProduct() {
      this.overlay = true;
      if (this.$refs.form.validate()) {
        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };
        if (this.newImage) {
          await uploadFileToCloudinary(this.newImage, "products").then(
            (fileResponse) => {
              this.product.image = fileResponse.url;
            }
          );
        }
        await ProductAPI.update(this.$route.params.id, this.product, config)
          .then((res) => {
            this.overlay = false;
            this.$router.push({
              name: "ProductList",
              params: { message: res.data.message },
            });
          })
          .catch((err) => {
            this.overlay = false;
            console.log(err);
          });
      }
    },
    async getProduct() {
      await ProductAPI.getProductById(this.$route.params.id)
        .then((res) => {
          this.product = res.data;
          this.product.exp = this.product.exp.substr(0, 10);
          this.temp_price = parseInt(this.product.price);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAllCategory() {
      await CategoryAPI.get()
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
      this.$router.push({ name: "ProductList" });
    },
    async addCategory() {
      if (this.$refs.form1.validate()) {
        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };
        await CategoryAPI.create(this.newCategory, config)
          .then((res) => {
            console.log(res.data);
            this.categories = [];
            this.getAllCategory();
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

.showImage {
  opacity: 0;
}
</style>
