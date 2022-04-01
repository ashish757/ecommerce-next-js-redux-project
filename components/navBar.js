import Link from "next/link"
import styles from '../styles/navBar.module.css'
import {useRouter} from 'next/router'

export default function NavBar() {

    const {pathname} = useRouter()

    return <nav className={styles.nav}>

        <ul className={styles.links}>
            <li className={pathname === '/' ? styles.active :''}><Link href="/"><a>Explore</a></Link></li>
            <li className={pathname === '/trending' ? styles.active :''}><Link href="/trending"><a>Trending</a></Link></li>
            <div className={styles.footer}>

                <li className={pathname === '/cart' ? `${styles.active} ${styles.cart}` : styles.cart}><Link href={`/cart`}><a>Cart</a></Link></li>

            </div>
        </ul>
       
    </nav>
}