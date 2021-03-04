import Head from 'next/head'
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link 
          rel="stylesheet" 
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" 
          crossorigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp
