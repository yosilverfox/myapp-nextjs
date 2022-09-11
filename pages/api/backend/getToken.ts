import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios'
import { getToken } from 'next-auth/jwt'


const tokenUrl = 'http://127.0.0.1:8000/token'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
}
// const body = "username=yoshi&password=ore"
const body = `username=${process.env.BACKEND_USERNAME}&password=${process.env.BACKEND_PASSWORD}`


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const front_token = await getToken({ req })
    if (!front_token) {
        res.status(401).end()
    }
    axios.post(tokenUrl, body, {headers: headers}).then((token) => {
        res.status(200).json(token.data)
    })
}
