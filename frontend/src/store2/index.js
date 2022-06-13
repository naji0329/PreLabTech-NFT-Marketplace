import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'


Vue.use(vuex, axios);
import state from './state';
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'

export default new vuex.Store({
  state,
});


// export default new vuex.Store({
//     strict: false,
//     state,
//     getters,
//     mutations, // assign new state, or refresh the state
//     actions, // // Make a API call async
// })
