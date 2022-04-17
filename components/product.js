import styles from '../styles/product.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../store/actions/cartActions'

export default function Product({ product, quantity, cart }) {
    const dispatch = useDispatch()
    const deleteItem = async () => {
        const req = await fetch("http://localhost:3000/api/cart/removeFromCart", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId : product._id
            })
        })
        const res = await req.json()
        if (res.status) {
            dispatch(removeFromCart({itemId: product._id}))
            // console.log(res);
        }
    }
    return <div className={styles.product}>
        <Link href={`/product/${product._id}`}>
            <a> <div className={styles.image}>

                <Image src={product.image} alt='apple' priority width={160}
                    height={180} objectFit="contain" />
            </div>  </a>
        </Link>
        <div className={styles.info}>
            <Link href={`/product/${product._id}`}>
                <a> <p className={styles.title}>{product.title.length < 50 ? product.title : `${product.title.slice(0, 49)}...`}</p></a>
            </Link>
            <p className={styles.rating}>{product.rating && product.rating.rate} stars <span className='muted'>{product.rating.count} ratings</span></p>
            <p className={styles.price}>$ {product.price}</p>
            <p className={styles.delivery}>delivered by monday 14/5</p>
            {quantity && <p>Qunatity : <strong>{quantity}</strong></p>}
            {cart ? <button onClick={deleteItem}>Delete</button> : null}
        </div>
    </div>
}