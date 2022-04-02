import styles from '../styles/product.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Product({product}) {
    return <div className={styles.product}>
        <Link href={`/product/${product._id}`}>
            <a> <div className={styles.image}>

                    <Image src={product.img} layout='fill' alt='apple ' />
                </div>  </a>
        </Link>
        <div className={styles.info}>
            <Link href={`/product/${product._id}`}>
                <a> <p className={styles.title}>{product.title}</p></a>
            </Link>
            <p className={styles.rating}>{product.rating} stars</p>
            <p className={styles.price}>$ {product.price}</p>
            <p className={styles.delivery}>delivered by monday 14/5</p>
        </div>
    </div>
}