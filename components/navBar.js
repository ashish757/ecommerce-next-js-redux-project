import Link from "next/link"
import styles from '../styles/navBar.module.css'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux"

export default function NavBar() {

    const cartCount = useSelector((state) => state.cart.count)
    const isAuth = useSelector((state) => state.auth.isAuth)

    const { pathname } = useRouter()


    console.count("NAV RENDERED")

    return <nav className={styles.nav}>

        <ul className={styles.links}>
            <li className={pathname === '/' ? styles.active : ''}><Link href="/"><a>Explore</a></Link></li>
            <li className={pathname === '/trending' ? styles.active : ''}><Link href="/trending"><a>Trending</a></Link></li>
            <div className={styles.footer}>

                <li className={pathname === '/cart' ? `${styles.active} ${styles.cart}` : styles.cart}>
                    <Link href={`/cart`}><a>
                        Cart{cartCount === 0 ? null : <sup>{cartCount}</sup>}
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