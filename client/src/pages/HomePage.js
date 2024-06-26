import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { AiOutlineReload } from "react-icons/ai";
import ProductCard from "../components/ProductCard";
import './HomePage.css';
// import banner from '/public/images/banner2.png'

function HomePage() {
  // const [auth, setAuth] = useAuth()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //get total product count
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  //get all products
  const base_url = process.env.REACT_APP_API;
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${base_url}/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
      setLoading(false);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${base_url}/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setProducts([...products, ...data?.products]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //----------------------------------------------------------------------------
  const [categories, setCategories] = useState([]);

  //get all categories
  const getAllCategory = async () => {
    try {
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${base_url}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
      console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  //get Total count of products
  const getTotal = async () => {
    try {
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.get(
        `${base_url}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //----------------------------------------------------------------------------
  //filter by categories
  const [checked, setChecked] = useState([]);
  const filterByCategories = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cid) => cid !== id);
    }
    setChecked(all);
  };

  //----------------------------------------------------------------------------
  //filter by price
  const [pricerange, setPriceRange] = useState([]);

  const filterProduct = async () => {
    try {
      const base_url = process.env.REACT_APP_API;
      const { data } = await axios.post(
        `${base_url}/api/v1/product/filter-product`,
        { checked, pricerange }
      );

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("Something went wrong in filetring");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length === 0 && pricerange.length === 0) getAllProducts();
    if (checked.length || pricerange.length) filterProduct();
  }, [checked, pricerange]);
  return (
    <Layout>
      <div className="row">
        <div className="row" style={{ background: "rgb(250,248,245)" }}>
          <div
            className="col-md-6 banner-image-top-container text-center"
          >
            <img
              src="/images/banner-woman-sitting.png"
              width={"100%"}
              className="banner-image-top"
            ></img>
          </div>
          <div
            className="col-md-6 text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/images/logo-gocarteasy-transparent-black.png"
              style={{ height: "120px" }}
            ></img>
            <h1 style={{ fontFamily: "sevillana-regular" }}>
              Shop. Click. Enjoy
            </h1>
            <p>
              Discover Quality, Convenience, and Affordability – Your Premier
              Destination for All Your Shopping Needs
            </p>
            <button
              style={{
                padding: "8px",
                border: "1px solid black",
                background: "rgb(25,40,115",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="col-md-3 ps-5 mt-5">
          <h6 className="text-center">Filter by Category</h6>
          {categories?.map((cat) => (
            <div key={cat._id}>
              <Checkbox
                onChange={(e) => {
                  filterByCategories(e.target.checked, cat._id);
                }}
              >
                {cat.name}
              </Checkbox>
              <br></br>
            </div>
          ))}
          <h6 className="text-center mt-4">Filter by Prices</h6>
          <Radio.Group
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
          >
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div
            className="d-flex flex-wrap"
            style={{ justifyContent: "space-around" }}
          >
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-primary loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore
                    <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
