import AuthService from '../services/AuthService';

const user = localStorage.getItem('user');

console.log("localstoreage user", user)

const initialState = user
  ? { status: { loggedIn: true }, user: JSON.parse(user) }
  : { status: { loggedIn: false }, user: null };



export const auth = {
  namespaced: true,
  state: {
    ...initialState
  },
  actions: {
    loginWithMetamask({ commit }, address) {
      return AuthService.loginWithMetamask(address).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
        return Promise.reject(error);
        }
      );
    },
    loginWithPhantom({ commit }, address) {
      return AuthService.loginWithPhantom(address).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    createNewWallet({ commit }, email) {
      console.log('ddddddddddddd', email);
      return AuthService.createNewWallet(email).then(
        res => {
          commit('createNewWalletSuccess', user);
          return Promise.resolve(res);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },

    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    createNewWalletSuccess() {
      console.log("createNewWalletSuccess")
    }
  },
  getters: {
    isLoggedIn: (state) => () => {
      return state.status.loggedIn;
    },
    currentChain: (state) => () => {
      return state.user.chain;
    }
  }
};