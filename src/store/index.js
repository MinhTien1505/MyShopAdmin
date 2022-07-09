import Vue from 'vue'
import Vuex from 'vuex'
import chat from './modules/chat';

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const storeData = {
  modules: {
    chat,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
}

const store = new Vuex.Store(storeData);
export default store;
