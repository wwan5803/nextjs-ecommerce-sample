import "../styles/globals.css"
import { useRouter } from "next/router"
import { StoreProvider } from "../utils/Store"

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
