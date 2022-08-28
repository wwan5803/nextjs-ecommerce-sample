import React, { useContext, useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Store } from "../utils/Store"

interface LayoutPropsTypes {
  title: string
  url?: string
  description?: string
  addCanonicalLink?: boolean
  image?: string
  children: React.ReactNode
}

const Layout = ({
  title,
  url,
  description,
  addCanonicalLink,
  image,
  children
}: LayoutPropsTypes) => {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const [cartItemsCount, setCartItemsCount] = useState(0)
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a: number, c: Product) => a + c.quantity, 0)
    )
  }, [cart.cartItems])

  return (
    <>
      <Head>
        <title>{title ? title : "header"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <meta name="description" content={description} />
        {addCanonicalLink && <link rel="canonical" href={url} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Sleek Style</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Sleek Style</p>
        </footer>
      </div>
    </>
  )
}

export default Layout
