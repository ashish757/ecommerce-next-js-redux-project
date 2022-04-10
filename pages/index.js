import Head from 'next/head'
import Filters from '../components/filters'
import Products from '../components/products'
import styles from '../styles/home.module.css'


export default function Home({ products }) {
  return (
      <main className={styles.home}>
        <Head>
          <meta name='theme-color' content='gray'/>
        </Head>

        <h1>EXPLORE</h1>
        <br />
        <div className={styles.container}>
          <Filters />
          <Products products={products} />
        </div>
      </main>
  )
}


export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products/allProducts")
  const products = await res.json()

  return {
    props: { products: products.products },
  }
}
