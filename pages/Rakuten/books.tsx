import type { NextPage } from "next"
import styles from '../../styles/Rakuten/books.module.css'
import { SubmitHandler, useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useState } from "react"
import axios from "axios"


interface Inputs {
    title: string
    bookNum: number
}

// バックエンドAPIの設定
const url = 'http://127.0.0.1:8000/users/me'
let headers = {
    'Authorization': ''
}


const RakutenBooks: NextPage = () => {

    // アクセストークンをセッションから取得
    const {data: session} = useSession()
    const [book, setBook] = useState()

    // APIのヘッダーに認証情報を追加
    headers['Authorization'] = 'Bearer ' + session?.accessToken
    
    // フォームの設定
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<Inputs>({
        defaultValues: {title: 'ONE PIECE', bookNum: 103},
        mode: 'onBlur',
        criteriaMode: 'all'
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        // ユーザー情報の取得（テスト用）
        axios.get(url, {headers: headers}).then((res) => {
            console.log(res.data)
            setBook(res.data)
        })
    }

    // 表示
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>楽天ブックス 電子書籍（楽天Kobo）検索</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="title">タイトル：</label>
                        <input id="title" {...register('title', {
                            required: {
                                value: true,
                                message: 'タイトルを入力してください'
                            }
                        })} />
                        
                        <label htmlFor="bookNum"></label>
                        <input id="bookNum" type="number" className={styles.form_num} {...register('bookNum', {
                            required: {
                                value: true,
                                message: '巻数を入力してください'
                            },
                        })} />巻
                    </div>
                    <div>
                        {errors.title?.message && (<div>{errors.title.message}</div>)}
                        {errors.bookNum?.message && (<div>{errors.bookNum.message}</div>)}
                    </div>
                    <hr />
                    <div>
                        {watch('title')} {watch('bookNum')}
                    </div>
                    <button type="submit" disabled={!isValid}>検索</button>
                </form>
                {book ? <div>{book['email']}</div> : <></>}
            </div>
        </div>
    )
}

export default RakutenBooks