import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Canvas Practice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Canvas Practice
        </h1>
        <div className={styles.grid}>
          <Link href={`/breakout`}>
            <a className={styles.card}>
              <p>Breakout</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
