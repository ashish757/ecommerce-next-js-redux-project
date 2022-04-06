import { createStore, compose } from "redux";
import rootReducer from "./reducers/rootReducer";

let composeEnhancers =  typeof window === 'undefined' ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

// if (typeof window !== 'undefined') {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

// const store = createStore(rootReducer, (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__()))

const store = createStore(rootReducer, composeEnhancers())

export default store;