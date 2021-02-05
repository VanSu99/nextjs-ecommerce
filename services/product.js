import axiosClient from "./axiosClient";

const productApis = {
  getProducts: () => {
    return axiosClient.get("/api/product/all");
  },
  getProductById: (id) => {
    return axiosClient.get(`/api/product/${id}`);
  },
};

export default productApis;
