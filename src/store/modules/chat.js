const state = {
    isRead: true,
  };
  
  const getters = {
    isRead: (state) => state.isRead,
  };
  
  const actions = {
    read({ commit }) {
      commit("SET_READ_MEASSGE", true);
    },
    un_read({ commit }) {
      commit("SET_READ_MEASSGE", false);
    },
  };
  
  const mutations = {
    SET_READ_MEASSGE(state, isRead) {
      state.isRead = isRead;
    },
  };
  
  export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
  