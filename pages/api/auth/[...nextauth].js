import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from 'axios'


// バックエンドの設定
const tokenUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT + '/token'
const headers = process.env.BACKEND_TOKEN_HEADERS
const body = `username=${process.env.BACKEND_USERNAME}&password=${process.env.BACKEND_PASSWORD}`


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        // NextAuthのsessionにバックエンドのアクセストークンを追加
        async session({ session, user, token }) {
            const backend_token = await axios.post(tokenUrl, body, {headers: headers})
            session.accessToken = backend_token.data.access_token
            return session
        }
    }
})
