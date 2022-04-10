import { useEffect, useState } from "react"
import Products from "../components/products"

export default function Cart() {

    const [products, setProducts] = useState(null)

    useEffect(() =>{
        const fetchData  = async () => {
            const req = await fetch("/api/cart/products")
            const res = await req.json()
            if( res.status) setProducts(res.products)
        }

        fetchData()
    }, [])

    return <main>
        <h1>CART</h1>
        {   products &&
            <Products products={products}/>
        }
    </main>

}


