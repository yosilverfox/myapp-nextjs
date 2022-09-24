import type { NextPage } from "next"
import styles from '../styles/Home.module.css'
import { useForm, SubmitHandler } from "react-hook-form"


interface Inputs {
    email: string
    password: string
}

const SampleForm: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, dirtyFields, isValid, errors },
        trigger,
        watch,
        getValues,
    } = useForm<Inputs>({
        defaultValues: {email: 'mail@example.com', password: '1234567'},
        mode: 'onBlur',
        reValidateMode: 'onChange',
        criteriaMode: 'all'
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>ログイン</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register('email', {
                            required: {
                                value: true,
                                message: '入力してください'
                            }}
                        )} />
                        <div>{watch('email')}</div>
                        {errors.email?.message && (<div>{errors.email.message}</div>)}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" {...register('password', {
                            required: {
                                value: true,
                                message: '入力してください',
                            },
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: 'アルファベットのみ入力してください',
                            },
                            minLength: {
                                value: 8,
                                message: '8文字以上入力してください',
                            },
                        }
                        )} type="password" />
                        {/* {errors.password?.message && (<div>{errors.password.message}</div>)} */}
                        {errors.password?.types?.pattern && (<div>{errors.password.types.pattern}</div>)}
                        {errors.password?.types?.minLength && (<div>{errors.password.types.minLength}</div>)}
                    </div>
                    <button type="submit" disabled={!dirtyFields.email || !isValid}>ログイン</button>
                    <button type="button" onClick={() => trigger('password')}>バリデーション</button>
                </form>
            </main>
        </div>
    )
}

export default SampleForm