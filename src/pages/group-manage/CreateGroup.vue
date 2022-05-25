<template>
  <div class="container-fluid pa-6">
    <v-row>
      <v-col cols="6">
        <h4 style="background-color: #e3dfb5; padding: 8px 16px">
          Information
        </h4>
        <v-card flat>
          <v-card-text>
            <v-text-field
              ref="title"
              v-model="group.title"
              :rules="[() => !!group.title || 'This field is required']"
              :error-messages="errorMessages"
              label="Title"
              placeholder="Group's Title"
              outlined
              required
            ></v-text-field>
            <v-textarea
              ref="description"
              v-model="group.description"
              :rules="[() => !!group.description || 'This field is required']"
              :error-messages="errorMessages"
              label="Description"
              auto-grow
              outlined
              rows="5"
              row-height="15"
              required
              counter
              maxlength="3000"
            ></v-textarea>

            <v-row>
              <v-col cols="8" class="pb-0">
                <v-text-field
                  ref="price"
                  :value="total_price | toNum"
                  @input="(value) => (temp_price = value)"
                  :rules="[() => !!temp_price || 'This field is required']"
                  :error-messages="errorMessages"
                  label="Price"
                  suffix="vnd"
                  placeholder="Group's Price"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pb-0">
                <v-btn
                  @click="calcPrice()"
                  height="32"
                  class="mt-3"
                  small
                  color="#00CCBC"
                  dark
                >
                  Calc Price
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="pb-0">
                <v-text-field
                  ref="calo"
                  :value="total_calo"
                  @input="(value) => (total_calo = value)"
                  :rules="[() => !!total_calo || 'This field is required']"
                  :error-messages="errorMessages"
                  label="Calorie"
                  suffix="kCal"
                  placeholder="Group's Calorie"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pb-0">
                <v-btn
                  @click="calcCalo()"
                  height="32"
                  class="mt-3"
                  small
                  color="#AC69E0"
                  dark
                >
                  Calc Calo
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <h4 style="background-color: #dcccff; padding: 8px 16px">Image</h4>
        <v-card flat>
          <v-card-text>
            <div>
              <img
                class="image-placeholder"
                v-if="previewImage == ''"
                id="image-preview"
                src="../../../public/assets/assets/img/food-preview.png"
              />
              <img
                class="image-placeholder"
                v-else
                id="image-preview"
                @click="selectImage"
                :src="`${previewImage}`"
              />
            </div>
            <div class="text-center">
              <label
                class="upload-img"
                for="upload-photo"
                style="backgroud-color: #675e55"
              >
                <i class="fas fa-upload"></i> Upload image here!
              </label>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="6">
        <h4 style="background-color: #d9f1e9; padding: 8px 16px">
          Available Products
        </h4>
        <v-card outlined>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn
              class="pl-6 pr-6 pt-1 pb-1 ml-6 mt-3"
              depressed
              color="#009EFB"
              dark
              @click="addProduct()"
              >Add</v-btn
            >
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="productList"
            dense
            fixed-header
            height="300px"
            item-key="_id"
            show-select
            v-model="addSelected"
            :single-select="singleSelect"
          >
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="6">
        <h4 style="background-color: #f1fbba; padding: 8px 16px">
          Group's Materials
        </h4>
        <v-card outlined>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn
              class="pl-6 pr-6 pt-1 pb-1 ml-6 mt-3"
              depressed
              color="#A0A77C"
              dark
              @click="removeProduct()"
              >Remove</v-btn
            >
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="material"
            dense
            fixed-header
            height="300px"
            item-key="_id"
            show-select
            v-model="removeSelected"
            :single-select="singleSelect"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <div class="text-right p-3">
          <v-btn class="ma-2" outlined @click="cancel()"> Cancel </v-btn>

          <v-btn class="ma-2" depressed color="#FF8D9A" @click="submit()">
            Create
          </v-btn>

          <v-btn class="ma-2" depressed color="#83401C" dark @click="reset()">
            Reset
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import GroupAPI from "../../api/GroupAPI";
import ProductAPI from "../../api/ProductAPI";
import uploadFileToCloudinary from "../../common/function";

export default {
  data() {
    return {
      overlay: false,
      previewImage: "",
      group: {
        title: "",
        description: "",
        price: "",
        calo: "",
        image: "",
        material: [],
      },
      productList: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Price", value: "price" },
        { text: "Calo", value: "calo" },
      ],
      search: "",
      singleSelect: false,
      addSelected: [],
      removeSelected: [],
      material: [],
      errorMessages: "",
      total_price: 0,
      total_calo: 0,

      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,

      temp_price: 0,
    };
  },
  watch: {
    temp_price: function () {
      if (!this.temp_price) {
        console.log("Empty");
      } else {
        console.log("Change");
        let v = String(this.temp_price);
        this.total_price = parseInt(v.replace(/,/g, ""));
      }
    },
  },
  created() {
    this.getAllProduct();
  },
  filters: {
    toVND: function (value) {
      if (typeof value !== "number") {
        console.log("Is Nan");
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
      if (!value) {
        console.log("Is NaN: " + value);
        return value;
      } else {
        if (typeof value !== "number") {
          value = parseInt(value);
          console.log("Input Value: ------" + value);
        }

        var result = Number(value).toLocaleString();
        console.log("Format Value: ------" + result);
        return result;
      }
    },
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
      this.group.image = e.target.files[0];
    },
    async getAllProduct() {
      await ProductAPI.get()
        .then((response) => {
          this.productList = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProduct() {
      console.log(this.addSelected);
      let merge = [...new Set([...this.material, ...this.addSelected])];
      this.material = merge;
      console.log(this.material);
    },
    removeProduct() {
      console.log(this.removeSelected);
      let result = this.material.filter(
        (item) => !this.removeSelected.includes(item)
      );
      this.material = result;
      console.log(this.material);
    },
    calcPrice() {
      let price = 0;
      this.material.forEach((item) => {
        price += parseInt(item.price);
      });
      this.total_price = price;
    },
    calcCalo() {
      let calo = 0;
      this.material.forEach((item) => {
        calo += parseFloat(item.calo);
      });
      this.total_calo = calo;
    },
    async submit() {
      this.overlay = true;
      if (!this.hasEmptyField()) {
        this.group.material = [];
        this.material.forEach((item) => {
          this.group.material.push({ product: item._id });
        });

        this.group.price = this.total_price.toString();
        this.group.calo = this.total_calo.toString();

        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };

        // const formData = new FormData();
        // formData.append("title", this.group.title);
        // formData.append("description", this.group.description);
        // formData.append("price", this.group.price);
        // formData.append("calo", this.group.calo);
        // formData.append("material", JSON.stringify(this.group.material));
        // formData.append("image", this.group.image);

        await uploadFileToCloudinary(this.group.image, "groups").then(
          (fileResponse) => {
            this.group.image = fileResponse.url;
            this.group.material = JSON.stringify(this.group.material);
            GroupAPI.create(this.group, config)
              .then((res) => {
                this.reset();
                this.overlay = false;
                this.text = res.data.message;
                this.snackbar = true;
              })
              .catch((error) => {
                this.overlay = false;
                console.log(error.message);
                this.text = error.message;
                this.snackbar = true;
              });
          }
        );
      }
    },
    hasEmptyField() {
      if (
        this.group.title == "" ||
        this.group.description == "" ||
        this.group.image == ""
      ) {
        this.text = "Please enter the information completely!";
        this.snackbar = true;
        return true;
      } else {
        return false;
      }
    },
    reset() {
      this.$refs["title"].resetValidation();
      this.$refs["description"].resetValidation();
      this.$refs["price"].resetValidation();
      this.$refs["calo"].resetValidation();

      this.group.title = "";
      this.group.description = "";
      this.group.price = "";
      this.group.calo = "";
      this.group.image = "";
      this.group.material = [];
      this.previewImage = "";
      this.addSelected = [];
      this.removeSelected = [];
      this.material = [];
      this.total_price = 0;
      this.total_calo = 0;
      this.temp_price = 0;
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
button {
  font-size: 14px;
  font-weight: 600;
}

.row label.col-form-label {
  /* display: block; */
  text-align: right;
}

.row input {
  width: 100%;
}

h3 {
  text-align: right;
}

.image-placeholder {
  width: 250px;
  height: 250px;
  display: block;
  border: 1px solid #212529;
  border-radius: 4px;
  /* padding-top: 10px; */
  margin: 0px auto 10px;

  background-color: #21252910;
  cursor: pointer;
  object-fit: cover;
}

label.upload-img {
  cursor: pointer;
  background-color: #242424;
  padding: 8px 15px;
  color: #ffffff;
  border: 1px solid #212529;
  font-weight: 500;
  border-radius: 4px;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.btn-create-new {
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #4c6ef5;
  color: #ffffff;
  border: 1px solid #4c6ef5;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
}

.btn-create-new i {
  padding-right: 8px;
}

.btn-cancel {
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #ffffff;
  color: #4c6ef5;
  border: 1px solid #4c6ef5;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
}

.btn-cancel i {
  padding-right: 8px;
}

.error-msg {
  display: none;
  text-align: left;
  margin-right: 24px;
  padding-top: 8px;
  font-weight: 400;

  word-break: break-word;
}

.submit-disable {
  opacity: 50%;
}

.image-product-in-table {
  width: 64px;
  height: 64px;
  object-fit: scale-down;
}
</style>
