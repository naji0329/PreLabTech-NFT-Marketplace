import axios from "axios";

export default {
  login(credentials) {
    return axios.post("/login/", credentials).then((response) => {
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
      .post("/sign-up/", credentials)
      .then((response) => response.data);
  },
  getSecretContent() {
    return axios.get("/secret-route/").then((response) => response.data);
  },

  loginWithMetamask(address) {
    console.log("inthe authservice", address);
    return axios
      .post("/auth/loginWithMetamask/", { address: address })
      .then((response) => {
        // if(response.data.accessToken) {
        localStorage.setItem("data", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        // }
        return response.data;
      });
  },
  loginWithPhantom(address) {
    return axios
      .post("/auth/loginWithPhantom/", { address: address })
      .then((response) => {
        // if(response.data.accessToken) {
        console.log(response.data);
        localStorage.setItem("data", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        // }
        return response.data;
      });
  },
  createNewWallet(email) {
    console.log("ssssssemail", email);
    return axios
      .post("/auth/createNewWallet/", { email: email })
      .then((response) => {
        return response.data;
      });
  },
};
