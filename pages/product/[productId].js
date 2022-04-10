import Image from "next/image"
import styles from '../../styles/productPage.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../store/actions/cartActions"
import { useState } from "react"

export default function ProductPage({product}) {

	const router = useRouter()
	const dispatch = useDispatch()
	const cartProducts = useSelector((state) => state.cart.products)
	const [count, setCount] = useState(1)

	if (router.isFallback) {
		console.log("FALLBACK");
		return <h1>Loading...</h1>
	}

	const addToCartHandler = () => {
		dispatch(addToCart({id: product._id, product: product, quantity: count}))
	}

	const countHandler = (e) => {
		setCount(e.target.value)
	}

	const countInc = () => setCount(count + 1)
	const countDec = () => setCount(count > 1 ? count - 1: count)
	let isCarted = false;
	// cartProducts.forEach(cartProduct => {
	// 	if (cartProduct.id === product._id) {
	// 		isCarted = true
	// 		return 
	// 	}
	// })



    console.count('PRODUCT RENDERD');


	return <main className={styles.page}>
		<div className={styles.image}>
			<Image src={product.image} layout="fill" alt={product.title}/>
		</div>
		<div className={styles.info}>
			<h1 className={styles.title}>{product.title}</h1>
			<h2 className={styles.price}>$ {product.price}</h2>
			<p className={styles.rating}>{product.rating.rate} stars <span className="muted">{product.rating.count} ratings</span></p>
		</div>
		<div className={styles.actions}>
			<div className={styles.quantity}>
				<button onClick={countDec}>-</button>
				<input type="text" value={count} onChange={countHandler}></input>
				<button onClick={countInc}>+</button>
			</div>
		
			<button className={styles.btn} onClick={addToCartHandler}>{isCarted ? "Added to Cart" : "Add to Cart"}</button>
			<button className={styles.btn}>Buy Now</button>
		</div>
	</main>

}



export async function getStaticPaths() {

	return {
		paths: [
			{ params: { productId: "624d71dad87ac4abb4a3a76f"} }
		  ],
		  fallback: true
	}
}

export async function getStaticProps(context) {
	const res = await fetch("http://localhost:3000/api/products/" + context.params.productId)
	const product = await res.json()

	return {
		props: {product: product.product}
	}
}

