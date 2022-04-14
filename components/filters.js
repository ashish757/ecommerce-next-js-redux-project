import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from '../styles/filters.module.css'
import { loadFilters } from '../store/actions/filterActions'
import Filter from './filter'
import { activeFilter } from '../store/actions/filterActions'

export default function Filters() {
    const filters = useSelector(state => state.filters.filters)

    const router = useRouter()
    const dispatch = useDispatch()

    const fetchFilters = async () => {
        console.log("FETCHED FILTERS");
        const req = await fetch('/api/filters')
        const res = await req.json()
        dispatch(loadFilters({ filters: res.filters }))
    }


    useEffect(() => {
        if (filters.length === 0) fetchFilters()
    }, [])


    // useEffect(() => {
    // const activeFilters = filters.filter(filter => filter.active)
    // const activeFilterIds = activeFilters.map(filter => filter._id)
    // console.log("filters changed");
    // JSON.stringify(activeFilterIds)
    // const obj = {
    //     pathname: '/',
    //     query: { category: 2 }
    // }
    // router.push(obj, undefined, { shallow: true })

    // }, [filters])

    const filterHandler = (filter) => {
        dispatch(activeFilter({ filterId: filter._id }))

        
    }

    console.log("rendered filters");

    return (
        <div className={styles.filtersWrapper}>

            <div className={styles.filtersNav}>
                <br />
                <h4>FILTERS</h4>

                <div className={styles.category}>
                    <p>Category</p>
                    <div className={styles.filters}>

                        {

                            filters && filters.map(filter => (
                                <Filter handler={filterHandler} filter={filter} key={filter._id} />
                            ))
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}