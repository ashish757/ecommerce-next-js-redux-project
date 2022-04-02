import { useEffect, useState } from 'react'
import styles from '../styles/products.module.css'
import Product from './product'

export default function Products({products}) {

    return <div className={styles.products}>

        { products && products.map(product => (
                <Product key={product._id} product={product} />

            ))
        }

       
        {/* <Product /> */}
    </div>
}



