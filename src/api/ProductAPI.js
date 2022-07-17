import api from './api';
const endpoint = '/product';
export default {
  get() {
    return api.get(`${endpoint}`);
  },
  get_all() {
    return api.get(`${endpoint}/all`);
  },
  getProductById(id) {
    return api.get(`${endpoint}/${id}`);
  },
  create(new_product, config) {
    return api.post(`${endpoint}/create`, new_product, config);
  },
  update(id, new_product, config) {
    return api.patch(`${endpoint}/${id}`, new_product, config);
  },
  bulkImport(products, config) {
    return api.post(`${endpoint}/bulk-import`, products, config);
  },
}