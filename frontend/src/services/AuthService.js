import axios from "axios";
const url = "http://localhost:5555/api/";
export default {
  login(credentials) {
    return axios.post(url + "login/", credentials).then((response) => {
      // if(response.data.accessToken) {
      localStorage.setItem("data", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // }
      return response.data;
    });
  },
  logout() {
    localStorage.removeItem("data");
    localStorage.removeItem("user");
    const msg = "logouted!";
    return msg;
  },
  signUp(credentials) {
    return axios
      .post(url + "sign-up/", credentials)
      .then((response) => response.data);
  },
  getSecretContent() {
    return axios.get(url + "secret-route/").then((response) => response.data);
  },

  loginWithMetamask(address) {
    return axios.post(url + "auth/loginWithMetamask/", {address: address}).then((response) => {
      // if(response.data.accessToken) {
      localStorage.setItem("data", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // }
      return response.data;
    });
  },
  createNewWallet(email) {
    return axios.post(url + "auth/createNewWallet/", {email: email}).then((response) => {
      return response.data;
    });
  }
};
