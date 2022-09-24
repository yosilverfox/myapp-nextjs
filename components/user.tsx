import { useSession } from "next-auth/react"
import axios from "axios"
import { userAgent } from "next/server"
import { useState } from "react"


// バックエンドAPIの設定
const url = 'http://127.0.0.1:8000/users/me'
let headers = {
    'Authorization': ''
}


export default function User() {
    const {data: session} = useSession()
    const [user, setUser] = useState()

    const FetchUser = () => {
        headers['Authorization'] = 'Bearer ' + session?.accessToken
        axios.get(url, {headers: headers}).then((res) => {
            setUser(res.data)
        })
    }

    if (session) {
        return (
            <>
                {user ? <div>メールアドレス：{user['email']}</div> : <button onClick={FetchUser}>メールアドレスを確認</button>}
            </>
        )
    } else {
        return (<></>)
    }
}
