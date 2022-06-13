import {createStore} from "vuex";
import { auth } from "./auth.module";

export default new createStore({
  modules: {
    auth,
  },
});
