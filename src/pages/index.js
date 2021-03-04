import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Login from '../components/login.jsx';

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Next.js | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h5 className={styles.title}>
          Faça seu login
        </h5>
        <div className={styles.grid}>
          <Login />
        </div>
      </main>

      <footer className={styles.footer}>
        Desenvolvido por &nbsp; <i className="fab fa-github"></i>
        <a
          href="https://github.com/edsonjuniornarvaes"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp; Edson Junior
        </a>
      </footer>
      
    </div>
  )
}
