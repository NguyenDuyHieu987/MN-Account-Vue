import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      listAccount: [],
      numberOfAccount: 0,
      activeSideBar: true,
      showAddMessage: false,
      showUpdateMessage: false,
      showRemoveMessage: false,
      failedMessage: false,
      requestAddAccount: {
        id: '',
        name: '',
        phone: '',
        iban: '',
        pin: '',
        address: '',
        balance: '',
        email: '',
        date: '',
      },
      requestEditAccount: {
        id: '',
        name: '',
        phone: '',
        iban: '',
        pin: '',
        address: '',
        balance: '',
        email: '',
        date: '',
      },
      requestRemoveAccount: {
        id: '',
      },
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
        .get(
          `${process.env.VUE_APP_SERViCE_URL}/account/getallaccount?page=${pageAccount}`
        )
        .then((accountResponse) => accountResponse.data);

      commit('setListAccount', dataAccount);
    },

    async getNumberOfAccount({ commit }) {
      const numberOfAccount = await axios
        .get(`${process.env.VUE_APP_SERViCE_URL}/account/getnumberofaccount`)
        .then((accountResponse) => accountResponse.data.result);

      commit('setNumberOfAccount', numberOfAccount);
    },
  },
});

export default store;
