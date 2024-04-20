import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const base_url = process.env.REACT_APP_API;
    const [values, setValues] = useSearch();
    useEffect(() => { console.log(values); })
    return (
        <Layout>
            <div className='conatiner'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values.results.length === 0 ? "No Products Found" : `Found ${values.results.length} Products`}</h6>
                    <div className="d-flex flex-wrap mt-4" style={{ justifyContent: "space-around" }}>
                        {
                            values.results.map((p) => (
                                <div key={p._id} className="card m-2" style={{ width: '18rem' }}
                                // onClick={() => { navigate(`/dashboard/admin/update-product/${p.slug}`) }}
                                >
                                    <img src={`${base_url}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="product image" />
                                    <div className="card-body">
                                        <h5 className="card-title"> {p.name} </h5>
                                        <p className="card-text"> {p.description} </p>
                                        <p>{p.price}</p>
                                        <button className='btn btn-outline-dark ms-2'>More Details</button>
                                        <button className='btn btn-outline-success ms-2'>Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search