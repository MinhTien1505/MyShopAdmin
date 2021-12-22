import api from './api';
const endpoint = '/group';
export default {
  get() {
    return api.get(`${endpoint}`);
  },
  get_all() {
    return api.get(`${endpoint}/all`);
  },
  getGroupById(id) {
    return api.get(`${endpoint}/${id}`);
  },
  create(group, config) {
    return api.post(`${endpoint}/create`, group, config);
  },
  update(id, group, config) {
    return api.patch(`${endpoint}/${id}/update`, group, config);
  },
}