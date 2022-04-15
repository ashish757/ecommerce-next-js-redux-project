
const useActiveFilters = (filterCategories) => {

    const activeFilters = filterCategories.map(filterCategory => {
        const activeFilters = filterCategory.filters.filter(filter => filter.active)

        return { category: filterCategory.category, activeFilters: activeFilters }
    })

    const getIds = () => {
        const activeIds = activeFilters.map(activeCategory => {
            const activeIds = activeCategory.activeFilters.map(filter => {
                return filter._id
            })
            // return {category: activeCategory.category, activeIds}
            return activeIds.length === 0 ? null : {category: activeCategory.category, activeIds}
        })
        
        const finalActiveIds = activeIds.filter(category => category !== null)
        console.log("finalActiveIds", finalActiveIds);
        return finalActiveIds

    }

    const getNames = () => {
        const activeNames = activeFilters.map(activeCategory => {
            const activeNames = activeCategory.activeFilters.map(filter => {
                return filter.name
            })
            // return {category: activeCategory.category, filters: activeNames}
            return activeNames.length === 0 ? null : {category: activeCategory.category, filters: activeNames}

        })

        const finalActiveNames = activeNames.filter(category => category)
        return  finalActiveNames
    }

    const getValues = () => {
        const activeValues = activeFilters.map(activeCategory => {
            const activeValues = activeCategory.activeFilters.map(filter => {
                return filter.value
            })
            // return {category: activeCategory.category, filters: activeNames}
            return activeValues.length === 0 ? null : {category: activeCategory.category, filters: activeValues}

        })

        const finalActiveValues = activeValues.filter(category => category)
        return  finalActiveValues
    }

    return {
        getFilters: () => activeFilters,
        getNames,
        getIds,
        getValues
    }
}
export default useActiveFilters