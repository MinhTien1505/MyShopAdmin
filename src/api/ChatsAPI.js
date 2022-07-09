import api from './api';
const endpoint = '/chat';

export default {
    getAllChats() {
      return api.get(`${endpoint}/getallchats`);
    },
    get(user_id) {
      return api.get(`${endpoint}/${user_id}`);
    },
  }