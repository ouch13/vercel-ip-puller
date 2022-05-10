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
        <title>Exspiravit's Portfolio</title>
        <meta name="description" content="Portfolio of projects by exspiravit" />
        <link rel="icon" href="https://cdn.discordapp.com/attachments/971514890432954398/972361701775249449/IMG_6235.gif" />
      </Head>
      {isLoading ? <div className={styles.loader}>Loading...</div> : <h1>Error 404: Page Not Found!</h1>}
    </div>
  )
}

export default Home
