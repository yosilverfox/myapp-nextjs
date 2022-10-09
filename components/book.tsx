import styles from '../styles/Rakuten/books.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface Book {
    author: string
    image: string
    price: number
    productUrl: string
    publisher: string
    salesDate: string
    title: string
}

export default function Book(props: Book) {
    return (
        <div className={styles.book}>
            <img src={props.image} alt={props.title} />
            <div className={styles.info}>
                <div className={styles.salesDate}>{props.salesDate}</div>
                <div className={styles.title}>{props.title}</div>
                <div>{props.author}</div>
                <div className={styles.publisher}>{props.publisher}</div>
                <div>{props.price} 円</div>
            </div>
            <Link href={props.productUrl} target="_blank"><button>購入ページ</button></Link>
        </div>
    )
}