import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Filters from '../components/filters'
import Products from '../components/products'
import { activeFilter } from '../store/actions/filterActions'
import styles from '../styles/Home.module.css'


export default function Home(props) {
  const dispatch = useDispatch()
  const filterCategories = useSelector(state => state.filters.filterCategories)

  const router = useRouter()

  // const filters = useSelector(state => state.filters.filters)
  // const activeFilters = filters.filter(filter => filter.active)
  // const activeFilterIds = activeFilters.map(filter => filter._id)


  useEffect(() => {
    
    if (Object.keys(router.query).length > 0 && filterCategories.length > 0) {
      let activeCategory = []

      // console.log("CATEGORY OUTSIDE", router.query );
      Object.keys(router.query).forEach(category => {
        // console.log("CATEGORY", category, router.query );
        activeCategory.push({ category, filters:  JSON.parse(router.query[category])})
      })

      // console.log("PARSEED QUERY", activeCategory);
      console.log("SET ACTIVE FILTERS BY URL loadFromURL:", activeCategory);

      dispatch(activeFilter({ loadFromURL: activeCategory }))

    }
    // else {
    // if (!router.isReady) return
    //   console.log("CLEARED ALL LOCAL ACTIVE FILTERES");
    //   dispatch(activeFilter({ loadFromURL: [] }))

    // }

  }, [dispatch, filterCategories.length, router.isReady, router.query, router.query.category])




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
