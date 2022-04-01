import NavBar from '../components/navBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return  <div id='mainWrapper'>
              <NavBar />
              <div style={{marginLeft: '8rem', flexGrow: 1}}>
                <Component {...pageProps}  />
              </div>
      </div>
}

export default MyApp
