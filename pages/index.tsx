import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const items = [
    {
      href: `breakout`,
      title: `Breakout`
    },
    {
      href: `bar-chart`,
      title: `Bar Chart`
    },
    {
      href: `svg-pie-chart`,
      title: `SVG Pie Chart`
    },
    {
      href: `clouds-over-background`,
      title: `clouds over background`
    },
    {
      href: `an-animated-solar-system`,
      title: `An animated solar system`
    },
    {
      href: `canvas-lightning`,
      title: `Canvas Lightning`
    },
    {
      href: `sprite-animation-coin`,
      title: `CREATE A SPRITE ANIMATION WITH HTML5 CANVAS AND JAVASCRIPT`
    },
  ];

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
        {items && items.map((item) => {
          return (
            <Link key={item.href} href={`/${item.href}`}>
              <a>
                <p>{item.title}</p>
              </a>
            </Link>
          )
        })}
      </main>
    </div>
  )
}
