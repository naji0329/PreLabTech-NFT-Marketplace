import axios from "axios";

import constants from '@/constants/constant.js';
const url = constants.url;

export default {
  createCollection(formData) {
    return axios.post(url + "collection/createCollection", formData).then((response) => {
      return response.data;
    });
  },
  verifyCollection(_id, contract_address) {
    return axios.post(url + "collection/verifyCollection", { _id, contract_address }).then((response) => {
      return response.data;
    });
  },
  getCollectionData(address, chain) {
    return axios.post(url + "collection/getCollectionData", { address, chain }).then((response) => {
      return response.data;
    });
  }
};
