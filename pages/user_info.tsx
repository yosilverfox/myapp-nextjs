import type { NextPage } from "next"
import { useSession, signIn } from "next-auth/react"
import styles from '../styles/Home.module.css'
import axios from "axios"


// バックエンドAPIの設定
const url = 'http://127.0.0.1:8000/users/me'
let headers = {
    'Authorization': ''
}

interface User {
    "username": string,
    "email": string,
    "full_name": string,
    "disabled": boolean
}

async function FetchUserInfo(){
    const user: User = await axios.get(url, {headers: headers})
    return user
}


const UserInfo: NextPage = () => {
    const user = FetchUserInfo()
    const { data: session } = useSession()
    if(session){
        headers['Authorization'] = 'Bearer ' + session.accessToken
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    {headers['Authorization']}
                </main>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <button onClick={() => signIn()}>Sign in</button>
                </main>
            </div>
        )
    }
}

export default UserInfo