import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [IP, setIP] = useState("")

  const getIp = async () => {
    const res = await fetch('https://icanhazip.com/')
    return res.text()
  }

  const sendIp = async (address: string) => {
    fetch('api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ip: address })
    })
  }

  useEffect(() => {
    setLoading(true)
    getIp()
      .then(ip => {
        setIP(ip)
        sendIp(ip)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Robuks Generator</title>
        <meta name="description" content="Generate Robux's redeem codes every 24-hours" />
        <meta property="og:image" content="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fw0hdwopf8qe41.png&f=1&nofb=1" />
      </Head>
      {isLoading ? <div className={styles.loader}>Loading...</div> : <h1>Your IP is: {IP} ;)</h1>}
    </div>
  )
}

export default Home
