import styles from '../styles/product.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Product({product}) {
    return <div className={styles.product}>
        <Link href={`/product/${product._id}`}>
            <a> <div className={styles.image}>

                    <Image src={product.image} layout='fill' alt='apple ' />
                </div>  </a>
        </Link>
        <div className={styles.info}>
            <Link href={`/product/${product._id}`}>
                <a> <p className={styles.title}>{product.title.length < 50 ? product.title : `${product.title.slice(0, 49)}...`}</p></a>
            </Link>
            <p className={styles.rating}>{product.rating && product.rating.rate} stars <span className='muted'>{product.rating.count} ratings</span></p>
            <p className={styles.price}>$ {product.price}</p>
            <p className={styles.delivery}>delivered by monday 14/5</p>
        </div>
    </div>
}