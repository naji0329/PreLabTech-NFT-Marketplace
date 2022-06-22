import axios from "axios";

export default {
  createNFT(formData) {
    return axios.post("/nft/createNFT", formData).then((response) => {
      return response.data;
    });
  },
};
