import '../styles/globals.css';
import '../styles/editUser.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from '../components/Layout';
import { DataProvider } from '../store/GlobalState';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
