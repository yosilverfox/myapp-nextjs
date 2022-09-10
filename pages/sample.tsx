import type { NextPage } from 'next'
import axios from 'axios'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from '../styles/Home.module.css'


const Sample: NextPage = () => {
    const { data: session } = useSession()
    const [token, setToken] = useState()
    const tokenUrl = 'http://127.0.0.1:8000/token'
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    const body = "username=yoshi&password=ore"

    const GetToken = () => {
        axios.post(tokenUrl, body, {headers: headers}).then((res) => {
            console.log(res.data)
            setToken(res.data)
        })
    }
    if (session) {    
        return (
            <>
                <div>Sample</div>
                <div><button onClick={() => signOut()}>Sign out</button></div>
                <div>{token ? <div>{token.access_token}</div> : <button onClick={GetToken}>データを取得</button>}</div>
            </>
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

export default Sample