const cartState = {
    count: 0,
    products: []
}

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            if (state.products.length === 0) return {
                ...state,
                count: state.count + action.payload.quantity,
                products: [...state.products, {product: action.payload.product, quantity: action.payload.quantity}]
            } 

            console.log(state.products);
            const found = state.products.find(product => {
                console.log(action.payload.quantity, product.quantity);
                return product.product._id === action.payload.id
            });
            console.log(found);

            if (!found) {
                return {
                    ...state,
                    count: state.count + action.payload.quantity,
                    products: [...state.products, {product: action.payload.product, quantity: action.payload.quantity}]
                }
            }

            if (found.quantity !== action.payload.quantity) {
                const newProducts = state.products.map(product => {
                    if (product.product._id === found.product._id) {
                        return {...product, quantity: action.payload.quantity}
                    }
                    return product
                })
                console.log(state.count, action.payload.quantity, found.quantity)
                return {
                    ...state,
                    count: state.count + action.payload.quantity - found.quantity,
                    products: newProducts
                }
            }
            
            return state
    
        default:
            return state
    }
}

export default cartReducer