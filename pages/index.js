import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Filters from '../components/filters'
import Products from '../components/products'
import { activeFilter } from '../store/actions/filterActions'
import styles from '../styles/home.module.css'


export default function Home(props) {
  const dispatch = useDispatch()
  const router = useRouter()

  // const filters = useSelector(state => state.filters.filters)
  // const activeFilters = filters.filter(filter => filter.active)
  // const activeFilterIds = activeFilters.map(filter => filter._id)


  useEffect(() => {
    if (router.query.category) {
      // works only when mounted 
      // set active filters according to the url
      console.log("SET ACTIVE FILTERS ACCORDING TO URL");
      const parsedCategory = JSON.parse(router.query.category)
      console.log(parsedCategory);
      dispatch(activeFilter({ filterId: parsedCategory }))
      
    } 
    else {
      dispatch(activeFilter({ filterId: [] }))

    }

  }, [dispatch, router.query.category])




  return (
    <main className={styles.home}>
      <Head>
        <meta name='theme-color' content='gray' />
      </Head>

      <h1>EXPLORE</h1>
      <br />
      <div className={styles.container}>
        <Filters />
        <Products products={props.products} />
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
