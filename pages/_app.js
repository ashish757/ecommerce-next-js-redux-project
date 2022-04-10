import { Provider } from 'react-redux'
import NavBar from '../components/navBar'
import storeFn from '../store'
import '../styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react'


function MyApp({ Component, pageProps }) {

  const {store, persistor} = storeFn()

  return (
    <Provider store={store}>

      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <div id='mainWrapper'>

          <NavBar />
          <div style={{ marginLeft: '8rem', flexGrow: 1 }}>
            <Component {...pageProps} />
          </div>
        </div>
      </PersistGate>

    </Provider>
  )
}

export default MyApp
