import { createStore, compose } from "redux";
import { combineReducers } from "redux"
import cartReducer from "./reducers/cartReducer"
import authReducer from "./reducers/authReducer"
import filterReducer from './reducers/filterReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import sessionStorage from 'redux-persist/lib/storage/session'

let composeEnhancers =  typeof window === 'undefined' ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;


// if (typeof window !== 'undefined') {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

// const store = createStore(rootReducer, (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__()))
 



const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filters'] 
}

const filtersPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
}


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  filters: persistReducer(filtersPersistConfig, filterReducer),
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
 const storeFn = () => {
    const store = createStore(persistedReducer, composeEnhancers())
  const persistor = persistStore(store)
  return { store, persistor }
}

export default storeFn




// export const store = createStore(persistedReducer, composeEnhancers())
// export const persistor = persistStore(store)

// const store = createStore(rootReducer, composeEnhancers())

// export {store, persistor};