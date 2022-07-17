<template>
  <div class="container-fluid pa-6">
    <div>
      <h2>Product: {{ product.name }}</h2>
      <p>Remaining quantity: {{ product.quantity_remaining }} / {{ product.unit }}</p>
      <p>Sold quantity: {{ product.quantity_sold }} / {{ product.unit }}</p>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Stock change</th>
            <th>Performer</th>
          </tr>
        </thead>
        <!-- <tr>
        <th>Date</th>
        <th>Stock change</th>
        <th>Performer</th>
      </tr> -->
        <tbody>
          <tr v-for="item in stock_change" :key="item._id">
            <td>{{ item.date | toDateTime }}</td>
            <td :style="getStyle(item.stock_change)">{{ item.stock_change > 0 ? `+${item.stock_change}` :
                item.stock_change
            }}</td>
            <td>{{ item.make_by.username }}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>
<script>
import ProductAPI from '../../api/ProductAPI';
import WarehouseAPI from '../../api/WarehouseAPI'

export default {
  data() {
    return {
      product: {
        name: '',
        quantity_remaining: 0,
        quantity_sold: 0,
        unit: ''
      },
      stock_change: [],
    }
  },
  async created() {
    await this.getProduct(this.$route.params.id);
    await this.getStockChangeByProductId(this.$route.params.id);
  },
  filters: {
    toDateTime(value) {
      const date = new Date(value);
      return date.toLocaleString('vi-VN');
    }
  },
  methods: {
    async getProduct(id) {
      this.product = await ProductAPI.getProductById(id).then((res) => res.data);
    },
    async getStockChangeByProductId(id) {
      this.stock_change = await WarehouseAPI.getStockChange(id).then((res) => res.data);
    },
    getStyle(value) {
      return `color: ${value > 0 ? '#10b981' : '#ef4444'}`
    }
  },
}
</script>

<style scoped>
p {
  padding: 0 !important;
}

table {
  border-collapse: collapse;
  width: 100%;
  max-width: 700px;
  overflow: hidden;
  color: #808080;
}

thead {
  background: #222222;
  color: #ffffff;
}

td,
th {
  text-align: left;
  padding: 14px 0px 14px 24px;
}

th {
  border: 1px solid #222222;
}

td {
  border: 1px solid #898989;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}
</style>