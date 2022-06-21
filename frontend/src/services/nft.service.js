import axios from "axios";

import constants from '@/constants/constant.js';
const url = constants.url;

export default {
  createNFT(formData) {
    return axios.post(url + "nft/createNFT", formData).then((response) => {
      return response.data;
    });
  },


  // verifyCollection(_id, contract_address) {
  //   return axios.post(url + "collection/verifyCollection", { _id, contract_address }).then((response) => {
  //     return response.data;
  //   });
  // },
  // getCollections(address, chain) {
  //   return axios.post(url + "collection/getCollections", { address, chain }).then((response) => {
  //     return response.data;
  //   });
  // },
  // getCollectionData(shortUrl, chain) {
  //   return axios.post(url + "collection/getCollectionData", { shortUrl, chain }).then((response) => {
  //     return response.data;
  //   });
  // },
  // getNFTData(_id) {
  //   return axios.get(url + "collection/getNFTData/"+_id).then((response) => {
  //     return response.data;
  //   });
  // }
};
