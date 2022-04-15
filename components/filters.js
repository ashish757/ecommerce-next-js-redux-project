import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/filters.module.css'
import { loadFilters } from '../store/actions/filterActions'
import Filter from './filter'
import { activeFilter } from '../store/actions/filterActions'

export default function Filters() {
    const filterCategories = useSelector(state => state.filters.filterCategories)

    const dispatch = useDispatch()

    const fetchFilters = async () => {
        console.log("FETCHED FILTERS");
        const req = await fetch('/api/filters')
        const res = await req.json()
        console.log(res);
        dispatch(loadFilters({ filters: res.filters }))
    }


    useEffect(() => {
        if (filterCategories.length === 0) fetchFilters()
    }, [])

    const filterHandler = (filterId, categoryId) => {
        dispatch(activeFilter({ filterId , categoryId}))


    }

    console.log("rendered filters");

    return (
        <div className={styles.filtersWrapper}>

            <div className={styles.filtersNav}>
                <br />
                <h4>FILTERS</h4>


                {
                    filterCategories && filterCategories.map(filterCategory => (
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