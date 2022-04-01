import styles from '../styles/products.module.css'
import Product from './product'

export default function Products() {
    return <div className={styles.products}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
    </div>
}