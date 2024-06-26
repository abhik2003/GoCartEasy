import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //get all products
  const base_url = process.env.REACT_APP_API;
  const getAllProducts = async () => {
    try {
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${base_url}/api/v1/product/get-product`
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div
              className="d-flex"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {products.map((product) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  onClick={() => {
                    navigate(`/dashboard/admin/update-product/${product.slug}`);
                  }}
                >
                  <div className="card-img-container">
                    <img
                      src={`${base_url}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top product-card-img"
                      alt="product image"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title"> {product.name} </h5>
                    <p className="card-text">
                      {" "}
                      {product.description.slice(0, 30)}
                      {product.description.length > 30 && "..."}{" "}
                    </p>
                    <p className="card-price">
                      {product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
