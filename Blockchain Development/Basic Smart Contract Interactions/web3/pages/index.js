import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MyButton from '../components/MyButton';

export default function Home() {
  const handleConnection = () => {
    if (!window.ethereum) {
      alert("Install Metamask")
      return;
    }

    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <MyButton onClick={() => handleConnection()} />
        </main>
      </div>
    )
  }
}