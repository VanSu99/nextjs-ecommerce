import axiosClient from "./axiosClient";

const orderApis = {
  createOrder: ({ address, mobile, total, cart }, token) => {
    return axiosClient.post(
      "/api/order",
      { address, mobile, total, cart },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },

  getOrders: (token) => {
    return axiosClient.get("/api/order", { headers: { Authorization: token } });
  },
};

export default orderApis;
