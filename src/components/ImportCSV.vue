<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" class="m-1" dark v-bind="attrs" v-on="on">
          Import csv
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h6 p-4">
          Import products from csv
        </v-card-title>
        <v-card-text>
          <div class="">
            <input ref="inputFileCSV" type="file" accept=".csv" class="d-none" @change="onChangeFileCSV">
            <div class="drag-drop-input" @dragenter.prevent="dragging = true" @dragover.prevent="() => { }"
              @dragleave.prevent="dragging = false" @drop.prevent="onDrop">
              <p class="text-h5">
                Drag and drop file here
              </p>
              <p>Or</p>
              <v-btn color="primary" depressed @click="inputFile">Browser file</v-btn>
            </div>
            <!-- <p v-if="isInvalid" class="text-red-600">{{ invalid_msg }}</p> -->
          </div>
          <div class="pt-4">
            <div v-if="mappedProducts && mappedProducts.length" class="text-center">
              <p class="text-subtitle-1">
                There are <span class="font-weight-bold blue--text">{{ mappedProducts.length }}</span>
                products found in your file.
                <br>
                Click <span class="font-weight-bold red--text text--lighten-1">Import</span> to add these products to
                the system.
              </p>
            </div>

            <div v-if="isInvalid" class="text-center">
              <p class="font-weight-bold red--text text--lighten-1 text-h6">
                <v-icon large color="red lighten-1">mdi-alert</v-icon>
                <span class="pl-4 ">{{ invalid_msg }}</span>
              </p>
            </div>

            <div v-if="is_imported" class="text-center">
              <p class="font-weight-medium green--text text-h6">
                <v-icon large color="green darken-2">mdi-checkbox-marked-circle</v-icon>
                <span class="pl-4 ">Yay! Your products just added.</span>
              </p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" :disabled="!mappedProducts || !mappedProducts.length || isInvalid" text
            @click="bulkImport">
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import papaparse from 'papaparse';
import { snakeCase } from 'change-case';
import { ProductFromSheet } from '../composables/productFromSheet';
import CategoryAPI from '../api/CategoryAPI';
import ProductAPI from '../api/ProductAPI';

export default {
  data() {
    return {
      dialog: false,
      is_imported: false,
      dragging: false,
      isInvalid: false,
      invalid_msg: 'Uh oh! Something went wrong. Please double check your work!',
      fileRows: [],
      uploadedFileHeaders: [],
      mappedProducts: [],
      mapping: {
        name: 'name',
        description: 'description',
        price: 'price',
        unit: 'unit',
        category: 'category',
        quantity_remaining: 'quantity',
        calo: 'calo',
        on_sale: 'on_sale',
        discount: 'discount',
        discount_type: 'discount_type'
      },
      categories: [],
      image: 'http://res.cloudinary.com/fresh-shop/image/upload/v1657988769/products/afpxxlj4xanz6ls1mgqr.png',
    }
  },
  computed: {
    category_names() {
      return this.categories.map(item => item.name);
    }
  },
  async created() {
    await this.getCategories();
  },
  methods: {
    inputFile: function () {
      this.$refs.inputFileCSV.click();
    },
    async getCategories() {
      await CategoryAPI.get()
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    readFile(file) {
      return new Promise((res) => {
        papaparse.parse(file, {
          header: true,
          complete(result) {
            res(result.data)
          },
        })
      })
    },
    validateFileType(file) {
      if (file.type !== 'text/csv') {
        this.isInvalid = true
        this.invalid_msg = 'Invalid type file!'
        return false
      }

      this.isInvalid = false
      return true
    },
    async extractFileContentAndNext(file) {
      const isValid = this.validateFileType(file)
      if (!isValid)
        return

      const rows = await this.readFile(file)
      // console.log('rows: ', rows);

      this.fileRows = rows.map((row) => {
        const result = {}
        for (const key in row)
          result[snakeCase(key)] = row[key]

        return result
      })

      this.uploadedFileHeaders = Object.keys(rows[0]).map(key => ({
        label: key,
        value: snakeCase(key),
      }))

      this.mappedProducts = this.fileRows.map(row => new ProductFromSheet(row, this.mapping))
      this.mappedProducts.splice(this.mappedProducts.length - 1)

      console.log('mappedProducts: ', this.mappedProducts)
    },

    async onChangeFileCSV(e) {
      this.is_imported = false
      this.isInvalid = false
      const file = e.target?.files?.[0]
      if (!file)
        return
      await this.extractFileContentAndNext(file)
    },

    async onDrop(event) {
      this.dragging = false
      const file = event.dataTransfer?.files?.[0]
      if (!file)
        return

      await this.extractFileContentAndNext(file)
    },
    async bulkImport() {
      console.log('Bulk import')
      if (this.mappedProducts.length) {
        console.log('In Bulk import')

        let token = JSON.parse(sessionStorage.getItem("admin_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };

        let new_categories = [];

        this.mappedProducts.forEach(item => {
          if (!this.category_names.includes(item.category) && !new_categories.includes(item.category)) {
            new_categories.push(item.category)
          }
        })

        console.log(new_categories);

        if (new_categories.length) {
          await CategoryAPI.import(new_categories.map(item => ({ name: item })), config);
        }

        // await this.getCategories();

        // this.mappedProducts.forEach(item => {
        //   this.categories.every((cat) => {
        //     if (cat.name === item.category) {
        //       item.category = cat._id
        //       return false
        //     }
        //     else {
        //       return true
        //     }
        //   })
        // })

        let products = this.mappedProducts.map(item => Object.assign({}, item, { image: this.image }));

        try {
          await ProductAPI.bulkImport(products, config);
          this.is_imported = true;
          this.mappedProducts = [];
          this.$emit('reload_product');
        }
        catch (error) {
          this.isInvalid = true;
          console.log(error);
          // this.invalid_msg = error.message;
        }
      }
    },
  },
}
</script>

<style>
.drag-drop-input {
  width: 100%;
  padding: 32px 40px;
  border: 2px dashed #808080;
  border-radius: 8px;
  background-color: #f5f3ff;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>