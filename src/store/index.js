import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      listAccount: [],
      numberOfAccount: 0,
      activeSideBar: true,
    };
  },
  mutations: {
    setActiveSideBar(state) {
      state.activeSideBar = !state.activeSideBar;
    },
    setListAccount(state, dataAccount) {
      state.listAccount = dataAccount;
    },
    setNumberOfAccount(state, numberOfAccount) {
      state.numberOfAccount = numberOfAccount;
    },
  },
  getters: {
    activeSideBar(state) {
      return state.activeSideBar;
    },
    getMovieByYear: (state) => (inputVal) => {
      return state.listMovie.filter(
        (mov) => mov.release_date.slice(0, 4) == inputVal
      );
    },
  },
  actions: {
    setActiveSideBar({ commit }) {
      commit('setActiveSideBar');
    },

    async getListAccount({ commit }, { pageAccount }) {
      const dataAccount = await axios
        .get(`http://localhost:3001/account/getallaccount?page=${pageAccount}`)
        .then((accountResponse) => accountResponse.data);

      commit('setListAccount', dataAccount);
    },

    async getNumberOfAccount({ commit }) {
      const numberOfAccount = await axios
        .get(`http://localhost:3001/account/getnumberofaccount`)
        .then((accountResponse) => accountResponse.data.result);

      commit('setNumberOfAccount', numberOfAccount);
    },
  },
});

export default store;
