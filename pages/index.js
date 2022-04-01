import Filters from '../components/filters'
import Products from '../components/products'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <main className={styles.home}>

          <h1>EXPLORE</h1>
           <br />
           <div className={styles.container}> 
             <Filters />
              <Products />
           </div>


    </main>
  )
}
