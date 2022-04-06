const cartState = {
    count: 0,
    items: []
}

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log(action);
            return {
                ...state,
                count: state.count + 1,
                items: [...state.items, action.payload.data]
            }
    
        default:
            return state
    }
}

export default cartReducer