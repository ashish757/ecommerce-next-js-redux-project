import { useEffect,  useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/products.module.css'
import Product from './product'
import { useRouter } from 'next/router'
import useActiveFilters from '../hooks/useActiveFilters'

export default function Products({ products, cart }) {
    const [fetchedProducts, setFetchedProducts] = useState(products)

    const router = useRouter()

    const filterCategories = useSelector(state => state.filters.filterCategories)
    const activeFilters = useActiveFilters(filterCategories)
    // const activeFilters = useCallback(useActiveFilters(filterCategories), [filterCategories])


    useEffect(() => {
        const fetchProducts = async () => {
            console.log("FETCHING FILTERED PRODUCTS", activeFilters.getIds());

            let filters = {}
            activeFilters.getValues().forEach(category => {
                if (category.category === "rating") {
                    filters[category.category] = parseInt(category.filters[0])
                } else {
                    filters[category.category] = category.filters
                }
            })

            const req = await fetch("http://localhost:3000/api/filters/filter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    filters
                })
            })
            const res = await req.json()
            console.log(res)
            if (res.status) setFetchedProducts(res.products)
        }

        if (activeFilters.getIds().length !== 0) fetchProducts()
        else setFetchedProducts(products)

    }, [filterCategories, products])

    useEffect(() => {
        if (window && router.isReady && filterCategories.length > 0) {

            // console.log("NO ACTIVE", activeFilters.getIds());

            if (activeFilters.getIds().length === 0 && activeFilters.getFilters().length !== 0) {
                console.log("NO ACTIVE FILTERS TO SET URL");
                window.history.replaceState({ ...window.history.state, as: "/", url: "/" }, '', "/")
                return
            }

            let newUrl = '/';
            let isFirst = true
            activeFilters.getIds().forEach(activeCategory => {
                if (isFirst) {
                    newUrl += `?${activeCategory.category}=${JSON.stringify(activeCategory.activeIds)}`
                    isFirst = false
                } else {
                    if (activeCategory.activeIds.length === 0) return
                    newUrl += `&${activeCategory.category}=${JSON.stringify(activeCategory.activeIds)}`
                }
            })

            console.log("SAT URL BY ACTIVE FILTERS  activeFilters.getIds():", activeFilters.getIds());
            window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        }

    }, [filterCategories, products, router.isReady])


    return <div className={styles.products}>

        {
            cart ? (products && products.map(product => (
                <Product key={product.product._id} product={product.product} quantity={product.quantity} cart />


            )))
                : (fetchedProducts && fetchedProducts.map(product => (
                    <Product key={product._id} product={product} />

                )))
        }


        {/* <Product /> */}
    </div>
}



