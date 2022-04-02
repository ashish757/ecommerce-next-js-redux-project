import Image from "next/image"
import { useRouter } from "next/router"
import styles from '../../styles/productPage.module.css'

export default function ProductPage() {
	const router = useRouter()
	const { productId } = router.query
	return <main className={styles.page}>
		<div className={styles.image}>
			{/* <Image /> */}
			Image
		</div>
		<div className={styles.info}>
			<p className={styles.title}>TITLE</p>
			<p className={styles.rating}>4.5 stars <span>4500 ratings</span></p>
			<p className={styles.price}>$ 700</p>
		</div>
		<div className={styles.actions}>
			<button className={styles.btn}>Add to Cart</button>
			<button className={styles.btn}>Buy Now</button>
		</div>
	</main>

}


