import api from "./api";
const endpoint = "/post";
export default {
  get() {
    return api.get(`${endpoint}`);
  },
  getById(id) {
    return api.get(`${endpoint}/${id}`);
  },
  create(post, config) {
    return api.post(`${endpoint}/create`, post, config);
  },
  update(id, new_post, config) {
    return api.patch(`${endpoint}/${id}`, new_post, config);
  },
  delete(id, config) {
    return api.delete(`${endpoint}/${id}`, config);
  },
};
