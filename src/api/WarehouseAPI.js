import api from './api';
const endpoint = '/warehouse';
export default {
  insertStock(data, config) {
    return api.post(`${endpoint}`, data, config);
  },
  getStockChange(id) {
    return api.get(`${endpoint}/${id}`);
  },
}