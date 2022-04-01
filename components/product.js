import styles from '../styles/product.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Product() {
    return <div className={styles.product}>
        <Link href={`/product`}>
            <a> <div className={styles.image}>

                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqO377B3KE926BVBWuWOZjdCwuRQpiTD44Jg&usqp=CAU" layout='fill' alt='apple ' />
                </div>  </a>
        </Link>
        <div className={styles.info}>
            <Link href={`/product`}>
                <a> <p className={styles.title}>Apple 13 pro max 128/12 M1 bionic</p></a>
            </Link>
            <p className={styles.rating}>4.5 stars</p>
            <p className={styles.price}>$ 700</p>
            <p className={styles.delivery}>delivered by monday 14/5</p>
        </div>
    </div>
}