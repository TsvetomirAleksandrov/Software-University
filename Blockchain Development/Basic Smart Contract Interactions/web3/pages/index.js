import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MyButton from '../components/MyButton';
import { ethers } from "ethers"
import { useState } from 'react';

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);

  const handleConnection = () => {
    if (!window.ethereum) {
      alert("Install Metamask")
      return;
    }

    const newProvider = new ethers.providers.Web3Provider(window.ethereum);

    newProvider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
        localStorage.setItem("connected", true);
        setProvider(newProvider);
      })
      .catch(e => console.log(e))
  }

  const getBlockNumber = () => {
    if (!provider || !currentAccount) {
      return;
    }

    provider.getBalance(currentAccount)
      .then((blockNumber) => {
        setBlockNumber(ethers.utils.formatEther(blockNumber));
        console.log(blockNumber);
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MyButton label="Connect" onClick={() => handleConnection()} />
        <MyButton label="Get Block Number" onClick={() => getBlockNumber()} />
        {currentAccount && <h1>{currentAccount}</h1>}
        {blockNumber && <h1>{blockNumber}</h1>}
      </main>
    </div>
  )
}
