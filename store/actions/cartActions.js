export const addToCart =  (data) =>{
    return {
        type: "ADD_TO_CART",
        payload: (typeof data === 'object' ? data : {data})
    }
}