import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [IP, setIP] = useState("")

  const getIp = async () => {
    const res = await fetch('https://ipinfo.io/json')
    return res.json()
  }

  const sendIp = async (data: any) => {
    fetch('api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    })
  }

  useEffect(() => {
    setLoading(true)
    getIp()
      .then(data => {
        getIp()
        sendIp(data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome To:</title>
        <meta name="description" content="Grape Juice's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <div className={styles.loader}>Loading...</div> : <h1>Error please try again</h1>}
    </div>
  )
};

