import api from './api';
const endpoint = '/category';
export default {
  get() {
    return api.get(`${endpoint}`);
  },
  create(name, config) {
    return api.post(`${endpoint}/create`, { name }, config);
  },
  import(categories, config) {
    return api.post(`${endpoint}/import`, categories, config);
  },
  update(id, category, config) {
    return api.patch(`${endpoint}/${id}`, { category }, config);
  },
  delete(id, config) {
    return api.delete(`${endpoint}/${id}`, config);
  },
}