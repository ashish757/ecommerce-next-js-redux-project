const filterState = {
    filters: []
}

const cartReducer = (state = filterState, action) => {
    switch (action.type) {
        case "LOAD_FILTERS":
            console.log("LOAD FILTERS", state.filters, action.payload.filters);
            return {
                ...state,
                filters: action.payload.filters
            }

        case "ACTIVE_FILTER":
            const newFilters = state.filters.map(filter => {
                if (Array.isArray(action.payload.filterId)) {

                    if (action.payload.filterId.includes(filter._id)) {

                        return { ...filter, active: true }
                    } else {
                        return { ...filter, active: false }
                    }

                }
                
                if (filter._id === action.payload.filterId) {
                    if (filter.active) {
                        return { ...filter, active: false }
                    }
                    return { ...filter, active: true }
                }


                return filter
            })

            return {
                ...state,
                filters: newFilters
            }

        default:
            return state
    }
}

export default cartReducer