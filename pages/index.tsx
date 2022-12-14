import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import About from '../components/about'
import User from '../components/user'
import Link from 'next/link'


const Home: NextPage = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>My App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            My App
          </h1>
  
          <p className={styles.description}>
            Sign in as { session.user?.name}<br />
            <button onClick={() => signOut()}>Sign out</button>
          </p>
  
          <div className={styles.grid}>
            <div className={styles.card}><About /></div>

            <div className={styles.card}><User /></div>
  
            <div className={styles.card}>
              <Link href="/Rakuten/books" className={styles.card}>
                <a>
                  楽天ブックス検索 &rarr;<br />
                  楽天ブックスで電子書籍（楽天Kobo）を検索
                </a>
              </Link>
            </div>
          </div>

        </main>
        </div>
    )
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    </div>
  )
}

export default Home
