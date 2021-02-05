import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../../store/GlobalState";

export default function DetailOrder() {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;
  const [orderDetail, setOrderDetail] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);

  return (
    <div>
      <Head>
        <title>Order Detail Page</title>
      </Head>
      <div>
        <button>Go back</button>
      </div>
      <div style={{ maxWidth: "700px", margin: "20px auto" }}>
        {orderDetail?.map((order) => (
          <div key={order._id} className="text-uppercase my-3">
            <h2 className="text-break">Đơn hàng: {order._id}</h2>
            <div className="mt-4">
              <h4>Shipping</h4>
              <p>Họ tên: {order?.user?.name}</p>
              <p>Email: {order?.user?.email}</p>
              <p>Địa chỉ: {order?.address}</p>
              <p>Số điện thoại: {order?.mobile}</p>
              <div
                className={`alert ${
                  order?.delivered ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center mt-3`}
              >
                {order?.delivered
                  ? "Đã giao hàng thành công"
                  : "Đang vận chuyển"}
              </div>
              <div>
                <h4>Order Items</h4>
                {order.cart.map((item) => (
                  <div
                    className="row border-bottom mx-0 p-2 justify-content-between align-items-center"
                    key={item._id}
                  >
                    <img
                      src={item.images[0].url}
                      alt="product"
                      style={{
                        width: "50px",
                        height: "45px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="flex-fill text-secondary px-3 m-0">
                      <Link href={`/product/${item._id}`}>
                        <a>{item?.title}</a>
                      </Link>
                    </h5>
                    <span className="text-info">
                      {item.quantity} x ${item.price} = $
                      {item.quantity * item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
