import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import { IoClose } from "react-icons/io5"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"
import dynamic from "next/dynamic"

function CartScreen() {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems }
  } = state
  const removeItemHandler = (item: Product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item })
  }
  const updateCartHandler = async (item: Product, qty: string) => {
    const quantity = Number(qty)
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } })
  }
  return (
    <Layout
      url={typeof window !== "undefined" ? window.location.href : ""}
      description="This is shopping cart"
      title="Shopping Cart"
    >
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: Product) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array.from(Array(item.countInStock).keys())].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <IoClose className="h-5 w-5"></IoClose>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce(
                    (a: number, c: Product) => a + c.quantity,
                    0
                  )}
                  ) : $
                  {cartItems.reduce(
                    (a: number, c: Product) => a + c.quantity * c.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button onClick={() => null} className="primary-button w-full">
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
