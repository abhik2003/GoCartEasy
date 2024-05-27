import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import './ProductCard.css'

function ProductCard({ product }) {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API;
  return (
      <div className="card m-2" style={{ width: "18rem" }}>
          <div className="card-img-container">
      <img
        src={`${base_url}/api/v1/product/product-photo/${product._id}`}
        className="card-img-top product-card-img"
        alt="product image"
        />
        </div>
      <div className="card-body">
        <h5 className="card-title"> {product.name} </h5>
        <p className="card-text"> {product.description.slice(0,30)}{product.description.length > 30 && "..."} </p>
        <p className="card-price">{product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}</p>
        <button
          className="btn btn-outline-dark ms-2"
          onClick={() => {
            navigate(`/product/${product.slug}`);
          }}
        >
          More Details
        </button>
        <button
          className="btn btn-outline-success ms-2"
          onClick={() => {
            setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product added successfully")
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
