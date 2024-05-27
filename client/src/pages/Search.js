import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import ProductCard from '../components/ProductCard'

const Search = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const base_url = process.env.REACT_APP_API;
    const [values, setValues] = useSearch();
    useEffect(() => { console.log(values); })
    return (
      <Layout>
        <div className="conatiner">
          <div className="">
            <h1>Search Results</h1>
            <h6>
              {values.results.length === 0
                ? "No Products Found"
                : `Found ${values.results.length} Products`}
            </h6>
            <div
              className="d-flex flex-wrap mt-4"
              style={{ justifyContent: "space-around" }}
            >
              {values.results.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Search