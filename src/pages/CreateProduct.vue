<template>
  <div class="container-fluid">
    <h3 class="pb-4 pt-4">Create product</h3>
    <form @submit.prevent="createProduct" enctype="multipart/form-data">
      <v-row>
        <v-col cols="8">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                v-model="product.name"
                required
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Price</label>
            <div class="col-sm-10">
              <input
                class="form-control"
                type="text"
                @change="format_curency($event)"
                v-model="product.price"
                required
                pattern="^(0|[1-9][0-9]*)$"
                title="Price should a number!"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-10">
              <select class="form-control" v-model="product.category" required>
                <option v-for="item in categories" :value="item" :key="item">{{
                  item
                }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                rows="5"
                id="comment"
                v-model="product.description"
                required
              ></textarea>
            </div>
          </div>
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
        <button class="btn btn-success mr-4" type="submit">
          <i class="fas fa-plus-circle"></i> Create
        </button>
        <button class="btn btn-warning" type="button" @click="cancel()">
          <i class="fas fa-undo-alt"></i> Cancel
        </button>
      </div>
      <v-snackbar v-model="snackbar" timeout="3000" :multi-line="true">
        <span class="text-danger">Error!</span>
        Please upload product image

        <template v-slot:action="{ attrs }">
          <v-btn color="red" fab text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    previewImage: null,
    snackbar: false,
    product: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      group: "",
    },
    categories: ["Vegetables", "Fruit"],
  }),
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
      if (!this.product.image) {
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
      formData.append("image", this.product.image);
      formData.append("description", this.product.description);
      formData.append("category", this.product.category);
      formData.append("group", this.product.group);
      axios
        .post("http://localhost:5000/api/createproduct", formData, config)
        .then((res) => {
          this.$router.push({
            name: "ListProduct",
            params: { message: res.data.message },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.$router.push({ name: "ListProduct" });
    },
    format_curency(e) {
      e.target.value = e.target.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
};
</script>

<style>
.imagePreviewWrapper {
  width: 85%;
  height: 300px;
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
</style>
