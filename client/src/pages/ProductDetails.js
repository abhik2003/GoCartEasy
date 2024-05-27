import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import './ProductDetails.css'
const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const base_url = process.env.REACT_APP_API;
  //get product
  const getProduct = async () => {
    try {
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${base_url}/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setProduct(data.product);
        getSimilarProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get similiar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/product/related-product/${pid}/${cid}`
      );
      if (data.success) {
        setRelatedProducts(data.products);
        console.log(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="row container product-details mt-4">
        <div className="col-md-6 text-center">
          <img
            src={`${base_url}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            // height="300px"
            width="350px"
          />
        </div>
        <div className="col-md-6 product-details-info pt-4">
          {/* <h1 className="text-center">Product Details</h1> */}
          {/* <hr /> */}
          <h6 className="product-details-name">{product.name}</h6>
          <h6 className="product-details-description">{product.description}</h6>
          <p className="product-details-price">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
          <p>Category : {product?.category?.name}</p>
            <button
            class="btn btn-secondary mt-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product added successfully");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
