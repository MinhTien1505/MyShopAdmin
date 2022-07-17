<template>
  <v-btn color="pink" class="white--text m-1" @click="exportFile">
    Export csv
  </v-btn>
</template>

<script>
import papaparse from 'papaparse';
import { ProductToJson } from '../composables/productToJson';
import ProductAPI from '../api/ProductAPI';

export default {
  data() {
    return {
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
      }
    }
  },
  created() {
  },
  methods: {
    async exportFile() {
      try {
        const res = await ProductAPI.get_all();
        let products = res.data.map((item) => {
          // eslint-disable-next-line no-unused-vars
          const { _id, __v, ...product } = item;
          return product;
        })
        products = products.map(item => new ProductToJson(item, this.mapping))
        // console.log(products)
        const csv = papaparse.unparse(products)
        // console.log('csv: ', csv)
        // window.open(`data:text/csv;charset=utf-8,${escape(csv)}`)

        const fileCsv = `data:text/csv;charset=utf-8,${csv}`
        const data = encodeURI(fileCsv)

        const link = document.createElement('a')
        link.setAttribute('href', data)
        link.setAttribute('download', 'export.csv')
        link.click()
      }
      catch (error) {
        console.log(error.message)
      }
    }
  },
}
</script>