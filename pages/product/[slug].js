import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import Layout from "../../components/Layout"
import data from "../../utils/data"
import { Store } from "../../utils/Store"

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)
  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((item) => item.slug === slug)
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>
  }

  const handleAddCart = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    )
    const quantity = existItem ? existItem.quantity + 1 : 1
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } })
  }

  return (
    <Layout
      url={window.location.href}
      description={product.description}
      title={product.name}
      image={`${window.location.host}${product.image}`}
    >
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-2 md:gap-3">
        <div className="md:col-span-1">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
          <div className="card p-5 mt-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={handleAddCart}>
              Add to cart
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  )
}
