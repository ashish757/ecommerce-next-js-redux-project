import Image from "next/image"
import styles from '../../styles/productPage.module.css'
import { useRouter } from 'next/router'

export default function ProductPage({product}) {

	const router = useRouter()

	if (router.isFallback) {
		console.log("FALLBACK");
		return <h1>Loading...</h1>
	}

	return <main className={styles.page}>
		<div className={styles.image}>
			<Image src={product.img} layout="fill" alt={product.title}/>
		</div>
		<div className={styles.info}>
			<h1 className={styles.title}>{product.title}</h1>
			<h2 className={styles.price}>$ {product.price}</h2>
			<p className={styles.rating}>{product.rating} stars <span>4500 ratings</span></p>
		</div>
		<div className={styles.actions}>
			<div className={styles.quantity}>
				<button>-</button>
				<p>0</p>
				<button>+</button>
			</div>
			<button className={styles.btn}>Add to Cart</button>
			<button className={styles.btn}>Buy Now</button>
		</div>
	</main>

}



export async function getStaticPaths(context) {

	return {
		paths: [
			{ params: { productId: "624829900089710f7a05b488"} }
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

