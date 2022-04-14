import Link from "next/link"
import styles from '../styles/navBar.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react"
import { loadCartCount } from '../store/actions/cartActions'

export default function NavBar() {

    const cartCount = useSelector((state) => state.cart.count)
    const isAuth = useSelector((state) => state.auth.isAuth)

    const { pathname } = useRouter()
    const dispatch = useDispatch()

    const fetchCartCount = useCallback(async () => {
        const req = await fetch("/api/cart/getCartCount")
        const res = await req.json()
        console.log("GOT CART COUNT");
        
        if (res.status) dispatch(loadCartCount({ cartCount: res.cartCount }))

    }, [])

    useEffect(() => {
        fetchCartCount()
    }, [])

    // useEffect(() => {
    //     if (cartCount === null) {
    //         console.log(cartCount);
    //         fetchCartCount()
    //     }
    // }, )


    console.count("NAV RENDERED")

    return <nav className={styles.nav}>

        <ul className={styles.links}>
            <li className={pathname === '/' ? styles.active : ''}><Link href="/"><a>Explore</a></Link></li>
            <li className={pathname === '/trending' ? styles.active : ''}><Link href="/trending"><a>Trending</a></Link></li>
            <div className={styles.footer}>

                <li className={pathname === '/cart' ? `${styles.active} ${styles.cart}` : styles.cart}>
                    <Link href={`/cart`}><a>
                        Cart{cartCount ? <sup>{cartCount}</sup> : null}
                    </a></Link>
                </li>


                {
                    isAuth ? (
                        <li className={pathname === '/account' ? `${styles.active}` : ''}>
                            <Link href={`/account`}><a>
                                Account
                            </a></Link>
                        </li>
                    ) : (
                        <li className={pathname === '/login' ? `${styles.active}` : ''}>
                            <Link href={`/login`}><a>
                                Login
                            </a></Link>
                        </li>
                    )
                }

            </div>
        </ul>

    </nav>
}