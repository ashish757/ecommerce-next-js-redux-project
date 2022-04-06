import { Provider } from 'react-redux'
import NavBar from '../components/navBar'
import store from '../store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>

      <div id='mainWrapper'>

        <NavBar />
        <div style={{ marginLeft: '8rem', flexGrow: 1 }}>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  )
}

export default MyApp
