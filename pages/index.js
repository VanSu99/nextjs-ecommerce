import Card from '../components/CardCate';
import CardVideo from '../components/CardVideo';
import CardProduct from '../components/CardProduct';
import styles from '../styles/home.module.css';
import Head from 'next/head';
import { productApis } from '../services';
import { useState } from 'react';

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <div className={styles.homepage}>
      <Head>
        <title>HomePage</title>
      </Head>
      <div className="container">
        <section className="mu__category">
          <div className="row">
            <Card />
          </div>
        </section>
        <section className={styles.mu__videoCate}>
          <div className="row">
            <CardVideo />
          </div>
        </section>
        <section className={styles.mu__products}>
          <h2>Product Sales</h2>
          <div className="row">
            <CardProduct products={products} />
          </div>
        </section>
      </div>
      <section>
        <div>
          <img
            src="https://assets.manutd.com/AssetPicker/images/0/0/14/159/958427/United_Against_Racism_Facebook_Header1612269108518_xlarge.jpg"
            alt="banner"
            width="100%"
          />
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await productApis.getProducts();
  // server side rendering
  return {
    props: {
      products: res.data.products,
      result: res.data.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
