import React from "react";
import styles from "./product.module.css";
import Link from "next/link";

export default function CardProduct({ products }) {
  return (
    <>
      {products?.map((value) => {
        return (
          <div className="col-lg-4 col-sm-6 col-12" key={value._id}>
            <div className={styles.card}>
              <div className={styles.imgCard}>
                <div
                  className={styles.imgItem}
                  style={{
                    backgroundImage: `url(${value.images[0].url})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* <img src={value.images[0].url} alt="product" /> */}
                </div>
              </div>
              <div className={styles.content}>
                <p>${value.price}</p>
                <Link href={`product/${value._id}`}>
                  <h4>
                    <a>{value.title}</a>
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
