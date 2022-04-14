export const loadFilters =  (data) =>{
    return {
        type: "LOAD_FILTERS",
        payload: data
    }
}
export const activeFilter =  (data) =>{
    return {
        type: "ACTIVE_FILTER",
        payload: data
    }
}
