import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/filters.module.css'
import { loadFilters } from '../store/actions/filterActions'
import Filter from './filter'
import { activeFilter } from '../store/actions/filterActions'

export default function Filters() {
    const filterCategories = useSelector(state => state.filters.filterCategories)
    const [loading, setLoading] = useState()

    const dispatch = useDispatch()
    
    
    useEffect(() => {

        const fetchFilters = async () => {
            setLoading(true)
            console.log("FETCHing FILTERS");
            const req = await fetch('/api/filters')
            const res = await req.json()

            console.log("FETCHED FILTERS", res);
            
            dispatch(loadFilters({ filters: res.filters }))
            console.log("LOADED FILTERS", filterCategories);
            setLoading(false)
        }

        // if (filterCategories.length === 0  && !loading) fetchFilters()
            fetchFilters()
    }, [])

    const filterHandler = (filterId, categoryId) => {
        dispatch(activeFilter({ filterId , categoryId}))
    }

    console.log("rendered filters", filterCategories);

    return (
        <div className={styles.filtersWrapper}>

            <div className={styles.filtersNav}>
                <br />
                <h4>FILTERS</h4>


                {
                    loading ? "Loading Filters.." : filterCategories.map(filterCategory => (
                        <div className={styles.category} key={filterCategory._id}>
                            <p>{filterCategory.category}</p>
                            <div className={styles.filters}>
                                {
                                    filterCategory.filters.map(filter => (
                                        <Filter handler={filterHandler} category={filterCategory.category} categoryId={filterCategory._id} filter={filter} key={filter._id}/>
                                    ))
                                }   
                            </div>
                        </div>
                    ))
                }


            </div>

        </div>
    )
}