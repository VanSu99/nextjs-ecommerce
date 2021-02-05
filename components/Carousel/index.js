import React from "react";
import Slider from "react-slick";
import styles from "./carousel.module.css";

export default function Carousel() {
  const settings = {
    dots: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="section__carousel">
      <Slider {...settings}>
        <div className={styles.imageWrap}>
          <img
            src="https://i.ytimg.com/vi/xlRF4Z_ePpE/maxresdefault.jpg"
            alt=""
          />
        </div>
        <div className={styles.imageWrap}>
          <img
            src="https://data.nssmag.com/images/galleries/21360/Tenis-Manchester-United-Adidas-Originals-Barcelona-99.jpg"
            alt=""
          />
        </div>
        <div className={styles.imageWrap}>
          <img
            src="https://cdn.shopify.com/s/files/1/2031/6995/files/adidas_Ultraboost_x_ManchesterUnited_Rose_EG8088_HANON_TAL-8.jpg?v=1564479598"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
