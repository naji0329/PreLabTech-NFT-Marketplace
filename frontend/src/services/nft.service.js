import axios from "axios";

export default {
  createNFT(formData) {
    return axios.post("/nft/createNFT", formData).then((response) => {
      return response.data;
    });
  },
  getNFTData(_collectionId) {
    return axios.get("/nft/getNFTs/"+_collectionId).then((response) => {
      return response.data;
    });
  },
  verifyNFT(_id) {
    return axios.post("/nft/verifyNFT", { _id }).then((response) => {
      return response.data;
    });
  },
};
