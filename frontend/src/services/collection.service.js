import axios from "axios";

import constants from '@/constants/constant.js';
const url = constants.url;

export default {
  createCollection(formData) {
    return axios.post(url + "collection/createCollection", formData).then((response) => {
      return response.data;
    });
  },
};
