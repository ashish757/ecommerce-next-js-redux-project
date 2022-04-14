const authState = {
    isAuth: false,
    userId: null
}

const cartReducer = (state = authState, action) => {
    switch (action.type) {
        case "LOGIN":
           
            return {
                ...state,
                isAuth: true,
                userId: action.payload.userId
            }
    
        case "LOGOUT":
           
            return {
                ...state,
                isAuth: false,
                userId: null,
            }
    
        default:
            return state
    }
}

export default cartReducer