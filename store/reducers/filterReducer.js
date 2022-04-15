const filterState = {
    filterCategories: []
}

const cartReducer = (state = filterState, action) => {
    switch (action.type) {
        case "LOAD_FILTERS":
            const RV = {
                ...state,
                filterCategories: action.payload.filters
            }

            console.log("LOADING FILTERS", RV);

            return RV   

        case "ACTIVE_FILTER":

            const newFilterCategories = state.filterCategories.map(filterCategory => {



                if (action.payload.loadFromURL) {

                    if (action.payload.loadFromURL.length === 0) {
                        const newFilters = filterCategory.filters.map(filter => {
                            if (filter.active) return { ...filter, active: false }
                            return filter

                        })

                        return { ...filterCategory, filters: newFilters }
                    }

                    let currentRV;
                    action.payload.loadFromURL.some(obj => {
                        if (obj.category === filterCategory.category) {
                            const newFilters = filterCategory.filters.map(filter => {
                                // console.log("URL ACTIVE", obj.filters);
                                // console.log("LOADING FROM URL", filter);
                                if (obj.filters.includes(filter._id)) {
                                    // obj.filter = filter._id
                                    // console.log("ACTIVATED", filter._id);
                                    return { ...filter, active: true }
                                } else {
                                    // console.log("DEACTIVATED", filter._id);
                                    return { ...filter, active: false }
                                }

                            })

                            currentRV = { ...filterCategory, filters: newFilters }
                            return true
                        }
                    })
                    if (currentRV) return currentRV
                }

                if (filterCategory._id === action.payload.categoryId) {

                    const newFilters = filterCategory.filters.map(filter => {
                        // special chek for if its a rating filter
                        if (filterCategory.category === "rating") {
                            // if its rating filter deactivate all other than the one which is clicked right now
                            if (filter._id === action.payload.filterId) {
                                if (filter.active) {
                                    return { ...filter, active: false }
                                }
                                return { ...filter, active: true }
                            }
                            return { ...filter, active: false }
                        } else if (filter._id === action.payload.filterId) {

                            if (filter.active) {
                                return { ...filter, active: false }
                            }
                            return { ...filter, active: true }

                        } else {
                            return filter
                        }
                    })

                    return { ...filterCategory, filters: newFilters }
                }

                return filterCategory
            })


            console.log("NEW FILTERS", newFilterCategories);

            return {
                ...state,
                filterCategories: newFilterCategories
            }

        default:
            return state
    }
}

export default cartReducer