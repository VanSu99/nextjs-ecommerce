import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/cart.module.css";
import CartItem from "../components/CartItem";
import { DataContext } from "../store/GlobalState";
import { productApis, orderApis } from "../services";

export default function cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [total, setTotal] = useState(0);
  const [cartInfo, setCartInfo] = useState({
    address: "",
    mobile: 0,
  });
  const { address, mobile } = cartInfo;

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart01"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (let item of cartLocal) {
          const res = await productApis.getProductById(item._id);
          const { _id, title, images, price, inStock, sold } = res.data.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, []);

  const handleOrder = async ({ address, mobile, total, cart }) => {
    const result = await orderApis.createOrder(
      {
        address,
        mobile,
        total,
        cart,
      },
      auth.token
    );
    if (result.data.err)
      return dispatch({ type: "NOTIFY", payload: { error: result.data.err } });

    dispatch({ type: "ADD_CART", payload: [] });
    return dispatch({ type: "NOTIFY", payload: { success: result.data.msg } });
  };

  const handlePayment = async () => {
    if (!address || !mobile) {
      dispatch({
        type: "NOTIFY",
        payload: { error: "Hãy nhập địa chỉ và số điện thoại của bạn." },
      });
    }

    let newCart = [];
    for(let item of cart) {
      const result = await productApis.getProductById(item._id)
      
    }
  };

  if (cart.length === 0)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/empty-cart.png" alt="empty_cart" />
      </div>
    );
  return (
    <div className={styles.cartContainer}>
      <div className="row mx-auto">
        <Head>
          <title>Cart Page</title>
        </Head>

        <div className="col-md-8 table-responsive my-3">
          <h2 className="text-uppercase" style={{ fontSize: "2.9rem" }}>
            Giỏ hàng của bạn
          </h2>
          <table className="table my-3">
            <tbody>
              {cart?.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  dispatch={dispatch}
                  cart={cart}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 my-3 text-right">
          <form>
            <h2 className="mb-3 text-uppercase" style={{ fontSize: "2.9rem" }}>
              Thanh toán
            </h2>
            <div className={styles.cartInfo}>
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control mb-2"
                value={address}
                onChange={(e) =>
                  setCartInfo({
                    ...cartInfo,
                    address: e.target.value,
                  })
                }
              />

              <label htmlFor="mobile">Số điện thoại</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                className="form-control mb-2"
                value={mobile}
                onChange={(e) =>
                  setCartInfo({
                    ...cartInfo,
                    mobile: e.target.value,
                  })
                }
              />
            </div>
          </form>
          <h4 className="my-2" style={{ fontSize: "2.3rem" }}>
            Phí vận chuyển: $15
          </h4>
          <h4 style={{ fontSize: "2.3rem" }}>
            Tổng tiền: <span>${total}</span>
          </h4>
          <button
            className="btn btn-danger mt-4"
            type="submit"
            style={{ padding: ".6rem 2.5rem", fontSize: "1.8rem" }}
            onClick={() => handleOrder({ address, mobile, total, cart })}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
