import axios from "axios";

export default {
  createNFT(formData) {
    return axios.post("/nft/createNFT", formData).then((response) => {
      return response.data;
    });
  },
  createAttr(attr) {
    return axios.post("/nft/createAttr", { attr }).then((response) => {
      return response.data;
    });
  },
  getNFTsByCollectionId(_collectionId) {
    return axios
      .get("/nft/getNFTs?collection_id=" + _collectionId)
      .then((response) => {
        return response.data;
      });
  },
  getNFTsbyUserId(address, chain) {
    return axios
      .get("/nft/getNFTs?address=" + address + "&chain=" + chain)
      .then((response) => {
        return response.data;
      });
  },
  getNFTData(_nftId) {
    return axios.get("/nft/getNFTData/" + _nftId).then((response) => {
      return response.data;
    });
  },
  verifyNFT(_id) {
    return axios.post("/nft/verifyNFT", { _id }).then((response) => {
      return response.data;
    });
  },

  listItem(nft, user) {
    return axios.post("/nft/listItem", { nft, user }).then((response) => {
      return response.data;
    });
  },
  cancelListing(nft, user) {
    return axios.post("/nft/cancelListing", { nft, user }).then((response) => {
      return response.data;
    });
  },
  buyItem(nft, user) {
    return axios.post("/nft/buyItem", { nft, user }).then((response) => {
      return response.data;
    });
  },
};
