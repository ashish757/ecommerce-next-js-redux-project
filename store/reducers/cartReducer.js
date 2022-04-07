const cartState = {
    count: 0,
    products: []
}

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log(action);
            let  isNew = true
            const newProducts = state.products.map(product => {
                if (product.id === action.payload.id) {
                    isNew = false
                    return {id: action.payload.id, quantity: action.payload.quantity}
                }
            });

            if (newProducts.length === 0 ) {
                return {
                    ...state,
                    count: isNew ? state.count + 1 : state.count,
                    products: [{id: action.payload.id, quantity: action.payload.quantity}]
                }
            }

            return {
                ...state,
                count: isNew ? state.count + 1 : state.count,
                products: newProducts
            }
    
        default:
            return state
    }
}

export default cartReducer