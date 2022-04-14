export const addToCart =  (data) =>{
    return {
        type: "ADD_TO_CART",
        payload: (typeof data === 'object' ? data : {data})
    }
}
export const loadCartCount =  (data) =>{
    return {
        type: "LOAD_CART_COUNT",
        payload: data
    }
}
export const loadCart =  (data) =>{
    return {
        type: "LOAD_CART",
        payload: data
    }
}
export const removeFromCart =  (data) =>{
    return {
        type: "REMOVE_FROM_CART",
        payload: data
    }
}