import Head from "next/head";
import { useContext, useRef, useState } from "react";
import { productApis } from "../../services";
import { addToCart } from "../../store/actions";
import { DataContext } from "../../store/GlobalState";
import styles from "./proid.module.css";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  const imgRef = useRef();
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    if (tab === index) return ` ${styles.active}`;
    return "";
  };

  return (
    <div className={styles.mu__detailProduct}>
      <Head>
        <title>Detail Product</title>
      </Head>
      <div className={styles.mu__banner_km}>
        <div>deal ends soon!</div>
        <img
          src="https://store.manutd.com/content/ws/all/efa2dd5c-765c-4dac-8c72-9895bd5a6469__1250X60.jpg"
          alt="banner_km"
        />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <img
              src={product.images[tab].url}
              alt=""
              className="w-100 d-block"
            />
            <div
              className="row mx-0 mt-3"
              style={{ cursor: "pointer" }}
              ref={imgRef}
            >
              {product.images?.map((img, index) => (
                <img
                  src={img.url}
                  key={index}
                  className={`${styles.mu__imgThumbnail} ${isActive(index)}`}
                  style={{ width: "20%", height: "80px", marginRight: "10px" }}
                  onClick={() => setTab(index)}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <h3 className="text-uppercase" style={{ fontSize: "3.3rem" }}>
              {product.title}
            </h3>
            <h5 className="text-danger" style={{ fontSize: "2.9rem" }}>
              ${product.price}
            </h5>
            <div
              className="row mx-0 d-flex justify-content-between"
              style={{ fontSize: "2.9rem" }}
            >
              {product.inStock > 0 ? (
                <h6>In stock: {product.inStock}</h6>
              ) : (
                <h6>Out stock</h6>
              )}
              <h6 className="text-danger">Sold: {product.sold}</h6>
            </div>
            <div className="my-2" style={{ fontSize: "1.7rem" }}>
              {product.description}
            </div>
            <div className="my-2" style={{ fontSize: "1.7rem" }}>
              {product.content}
              {product.content}
              {product.content}
            </div>
            <button
              type="button"
              className="btn btn-danger d-block my-3 px-3"
              style={{ fontSize: "1.9rem" }}
              disabled={product.inStock === 0 ? true : false}
              onClick={() => dispatch(addToCart(product, cart))}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await productApis.getProductById(id);
  // server side rendering
  return {
    props: {
      product: res.data.product,
    }, // will be passed to the page component as props
  };
}

export default DetailProduct;
