import Link from "next/link";
import React from "react";
import { decrease, deleteProduct, increase } from "../../store/actions";
import styles from "./cartItem.module.css";

export default function CartItem({ item, dispatch, cart }) {
  return (
    <tr>
      <td style={{ width: "100px", overflow: "hidden" }}>
        <img
          src={item.images[0].url}
          alt="cart_image"
          className="img-thumbnal"
          style={{ minWidth: "80px", height: "80px" }}
        />
      </td>
      <td style={{ minWidth: "200px" }} className=" align-middle">
        <div className={styles.cartContent}>
          <div style={{ width: "480px" }}>
            <Link href={`/product/${item._id}`}>
              <a className={styles.contentItem}>{item.title}</a>
            </Link>
          </div>
          <div className={styles.cartQuantity}>
            <button
              onClick={() => dispatch(decrease(cart, item._id))}
              disabled={item.quantity === 1 ? true : false}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increase(cart, item._id))}>
              +
            </button>
          </div>
          <h5 className={styles.cartPrice}>${item.price * item.quantity}</h5>
        </div>
        <button
          className={styles.cartBtn}
          onClick={() => dispatch(deleteProduct(cart, item?._id, "ADD_CART"))}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}
