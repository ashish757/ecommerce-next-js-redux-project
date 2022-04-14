const cartState = {
    count: null,
    cartItems: []
}

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            if (state.cartItems.length === 0) return {
                ...state,
                count: action.payload.quantity,
                cartItems: [...state.cartItems, {product: action.payload.product, quantity: action.payload.quantity}]
            } 

            console.log(state.cartItems);   
            const found = state.cartItems.find(product => {
                console.log(action.payload.quantity, product.quantity);
                return product.product._id === action.payload.id
            });
            console.log(found);

            if (!found) {
                return {
                    ...state,
                    count: state.count + action.payload.quantity,
                    cartItems: [...state.cartItems, {product: action.payload.product, quantity: action.payload.quantity}]
                }
            }

            if (found.quantity !== action.payload.quantity) {
                const newProducts = state.cartItems.map(product => {
                    if (product.product._id === found.product._id) {
                        return {...product, quantity: action.payload.quantity}
                    }
                    return product
                })
                console.log(state.count, action.payload.quantity, found.quantity)
                return {
                    ...state,
                    count: state.count + action.payload.quantity - found.quantity,
                    cartItems: newProducts
                }
            }
            
            return state

        case "LOAD_CART_COUNT":
            console.log("LAODCARTCOUNT", action.payload.cartCount);

            return {
                ...state,
                count: action.payload.cartCount
            }

        case "LOAD_CART":
            console.log("LOADCART", state);
            return {
                ...state,
                cartItems: action.payload.cartItems
            }
       
        case "REMOVE_FROM_CART":

            let quantity;
            const newItems = state.cartItems.filter(item => {
                if (item.product._id === action.payload.itemId) {
                    quantity = item.quantity
                }
                return item.product._id !== action.payload.itemId
            })

            return {
                ...state,
                count: state.count - quantity,
                cartItems: newItems
            }

        case "LOGOUT":
            return {
                ...state,
                cartItems: [],
                count: 0
            }


    
        default:
            return state
    }
}

export default cartReducer