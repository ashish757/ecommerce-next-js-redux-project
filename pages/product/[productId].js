import Image from "next/image"
import styles from '../../styles/productPage.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux"
import { addToCart } from "../../store/actions/cartActions"

export default function ProductPage({product}) {

	const router = useRouter()
	const dispatch = useDispatch()

	if (router.isFallback) {
		console.log("FALLBACK");
		return <h1>Loading...</h1>
	}

	const addToCartHandler = () => {
		dispatch(addToCart(product._id))
		// dispatch({type: "ADD_TO_CART", payload: {id: product._id}})
	}

    // console.log(product);


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
				<button>-</button>
				<p>0</p>
				<button>+</button>
			</div>
			<button className={styles.btn} onClick={addToCartHandler}>Add to Cart</button>
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
	const res = await fetch("http://localhost:3000/api/product/" + context.params.productId)
	const product = await res.json()

	return {
		props: {product: product.product}
	}
}

