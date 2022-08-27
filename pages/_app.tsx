import "../styles/globals.css"
import { useRouter } from "next/router"
import { StoreProvider } from "../utils/Store"

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
