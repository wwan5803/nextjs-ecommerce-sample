import { useContext } from "react"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import data from "../utils/data"

export default function Home({ products }) {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      products: data.products
    }
  }
}
