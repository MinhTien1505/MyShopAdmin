import api from './api';
const endpoint = '/order';
export default {
  get() {
    return api.get(`${endpoint}/all`);
  },
  getById(id) {
    return api.get(`${endpoint}/${id}`);
  },
  getByStatus(status) {
    return api.get(`${endpoint}/status/${status}`);
  },
  create(order, config) {
    return api.post(`${endpoint}/create`, order, config)
  },
  updateStatus(id, status, config) {
    return api.patch(`${endpoint}/${id}/updateStatus`, { status }, config);
  },

  // Shipper
  getByShipperAndStatus(status, config) {
    return api.get(`${endpoint}/shipper/${status}`, config);
  },
  pickup(id, config) {
    return api.get(`${endpoint}/shipper/${id}/pickup`, config);
  },
  cancel_pickup(id, config) {
    return api.get(`${endpoint}/shipper/${id}/cancelPickup`, config);
  }
}