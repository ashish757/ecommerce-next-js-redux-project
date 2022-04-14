import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/products.module.css'
import Product from './product'
import { useRouter } from 'next/router'

export default function Products({ products, cart }) {
    const [fetchedProducts, setFetchedProducts] = useState(products)

    const router = useRouter()

    const filters = useSelector(state => state.filters.filters)

    useEffect(() => {
        const activeFilters = filters.filter(filter => filter.active)
        const activeFilterIds = activeFilters.map(filter => filter._id)
        const activeFilterNames = activeFilters.map(filter => filter.filter)

        console.log("FETCH DATA");
        const fetchProducts = async () => {
            const req = await fetch("/api/filters/filter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: activeFilterNames
                })
            })
            const res = await req.json()
            console.log(res)
            if (res.status) setFetchedProducts(res.products)
        }

        if (activeFilterIds.length !== 0) fetchProducts()
        else setFetchedProducts(products)
        
        
        if (window) {
            if (activeFilterIds.length === 0) {
                window.history.replaceState({ ...window.history.state, as: "/", url: "/" }, '', "/")
                return
            }
                const newUrl = `/?category=${JSON.stringify(activeFilterIds)}`
                window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        }

    }, [filters])


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



