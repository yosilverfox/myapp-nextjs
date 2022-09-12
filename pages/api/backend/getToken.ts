import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios'
import { getToken } from 'next-auth/jwt'


// バックエンドの変数
const tokenUrl = 'http://127.0.0.1:8000/token'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
}
// const body = "username=yoshi&password=ore"
const body = `username=${process.env.BACKEND_USERNAME}&password=${process.env.BACKEND_PASSWORD}`


// Next-Auth認証トークンがある場合、バックエンドのアクセストークンを取得する
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const front_token = await getToken({ req })
    if (!front_token) {
        res.status(401).json({"message": "Not signed in"})
    } else {
        return backendHandler(req, res)
    }
}


// バックエンドのアクセストークンを取得
async function backendHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const backend_token = await axios.post(tokenUrl, body, {headers: headers})
    res.status(200).json(backend_token.data)
}