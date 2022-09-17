import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios'
import { getToken } from "next-auth/jwt"
import { resourceLimits } from "worker_threads"


// バックエンドAPIの設定
const url = 'http://127.0.0.1:8000/users/me'
let headers = {
    'Authorization': ''
}
headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5b3NoaSIsImV4cCI6MTY2MzQwODk3MH0.OVOm22BC4UiiisMTc2GYQijAA762IzF0tddfnNp_hEY'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const front_token = await getToken({ req })
    if(!front_token) {
        res.status(401).json({"message": "Not signed in"})
    } else {
        // console.log("ユーザー情報")
        // res.end()
        return backendHandler(req, res)
    }
}

async function backendHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user_info = await axios.get(url, {headers: headers})
    res.status(200).json(user_info.data)
}