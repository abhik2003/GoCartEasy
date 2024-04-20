import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API;
    //get product
    const getProduct = async () => {
        try {
            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.get(`${base_url}/api/v1/product/get-product/${params.slug}`)
            if (data.success) {
                setProduct(data.product);
                getSimilarProducts(data.product._id, data.product.category._id);

            }
        } catch (error) {
            console.log(error);

        }
    }

    //get similiar products
    const getSimilarProducts = async (pid, cid) => {
        try {

            const { data } = await axios.get(`${base_url}/api/v1/product/related-product/${pid}/${cid}`);
            if (data.success) {
                setRelatedProducts(data.products);
                console.log(data);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])
    return (
        <Layout>
            <div className="row container product-details mt-4">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300px"
                    // width="350px"
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Product Details</h1>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>
                        Price :
                        {product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4>Similar Products ➡️</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div key={p._id} className="card m-2" style={{ width: '18rem' }}
                        // onClick={() => { navigate(`/dashboard/admin/update-product/${p.slug}`) }}
                        >
                            <img src={`${base_url}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="product image" />
                            <div className="card-body">
                                <h5 className="card-title"> {p.name} </h5>
                                <p className="card-text"> {p.description} </p>
                                <p>{p.price}</p>
                                <button className='btn btn-outline-dark ms-2' onClick={() => { navigate(`/product/${p.slug}`) }}>More Details</button>
                                <button className='btn btn-outline-success ms-2'>Add to Cart</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails