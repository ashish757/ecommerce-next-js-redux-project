import { combineReducers } from "redux"
import cartReducer from "./cartReducer"
import authReducer from "./authReducer"
import filterReducer from './filterReducer'


const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    filters: filterReducer,
})

export default rootReducer