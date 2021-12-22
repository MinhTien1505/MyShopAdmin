import api from './api';
const endpoint = '/user';
export default {
  signup(data) {
    return api.post(`${endpoint}/create`, data);
  },
  createShipper(data) {
    return api.post(`${endpoint}/create-shipper`, data);
  },
  login_admin(username, password) {
    return api.post(`${endpoint}/login-admin`, { username, password });
  },

  get_all() {
    return api.get(`${endpoint}/all`);
  },
  getUserById(id) {
    return api.get(`${endpoint}/${id}`);
  },
  getUserByUsername(username) {
    return api.get(`${endpoint}/username/${username}`);
  },
  getUserByEmail(email) {
    return api.get(`${endpoint}/email/${email}`);
  },
  
  update(user_id, data) {
    return api.patch(`${endpoint}/${user_id}`, data);
  },
  updateStatus(user_id, status, config) {
    return api.patch(`${endpoint}/${user_id}/update-status`, { status }, config);
  },
  changePassword(user_id, old_password, new_password) {
    return api.patch(`${endpoint}/${user_id}/change-password`, { password: old_password, new_password: new_password })
  },

  verifyUser(verifyCode) {
    return api.post(`${endpoint}/verify-user`, {verifyCode});
  },
  forgotPassword(email) {
    return api.post(`${endpoint}/forgot-password`, { email });
  },
  verifyResetPassword(verifyCode) {
    return api.post(`${endpoint}/verify-reset-password`, {verifyCode});
  },
  resetPassword(email, new_password) {
    return api.post(`${endpoint}/${email}/reset-password`, { new_password })
  },
  
}