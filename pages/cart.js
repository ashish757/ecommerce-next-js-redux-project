import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Products from "../components/products"
import { loadCart } from "../store/actions/cartActions"

export default function Cart() {

    const cartItems = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()

    useEffect(() =>{
        console.log("mounted");
        const fetchData  = async () => {
            const req = await fetch("http://localhost:3000/api/cart/products")
            const res = await req.json()
            // console.log("cartPRo",res);

            if(res.status) dispatch(loadCart({cartItems: res.products}))
        }

        fetchData()
    }, [])

    return <main>
        <h1>CART</h1>
        {   cartItems.length ? <Products products={cartItems} cart/> : <h1 style={{marginTop: '3rem', color: "gray"}}>No Products in your cart yet . </h1>
        }
    </main>

}


