import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
// import slugify from 'slugify';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const base_url = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');   //it stores id only
    const [id, setId] = useState('');

    //get single product
    const getSingleproduct = async () => {
        try {
            const base_url = process.env.REACT_APP_API;
            console.log(params.slug);
            const { data } = await axios.get(`${base_url}/api/v1/product/get-product/${params.slug}`);
            // console.log(data);
            if (data.success) {
                setId(data.product._id);
                setName(data.product.name);
                setCategory(data.product.category._id);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setQuantity(data.product.quantity);


            }
            else {
                toast.error('Error in product data fetching');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single product')

        }
    }

    //get all categories
    const getAllCategory = async () => {
        try {
            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.get(`${base_url}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.category)
            }
            console.log(data.category);

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting categories')
        }
    }

    useEffect(() => {
        getSingleproduct();
        getAllCategory();
    }, []);

    //submit handler
    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("Hello");
            const productdat = new FormData();
            productdat.append("name", name);
            productdat.append("description", description);
            productdat.append("price", price);
            productdat.append("quantity", quantity);
            productdat.append("photo", photo);
            productdat.append("category", category);

            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.put(`${base_url}/api/v1/product/update-product/${id}`, productdat);
            console.log(data);
            if (data?.success) {
                toast.success('Product updated successfully');
                navigate('/dashboard/admin/all-products')
            }
            else {
                toast.error(data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    const deleteHandler = async (e) => {
        e.preventDefault();
        try {
            const ans = window.prompt('Are you sure to delete this product(yes/no) ? ');
            console.log(ans);
            if (ans.toLowerCase() !== 'yes') return;
            // console.log('deleteing');
            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.delete(`${base_url}/api/v1/product/delete-product/${id}`);
            if (data.success) {
                toast.success(data.message);
                navigate('/dashboard/admin/all-products');
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something ent wrong');
        }
    }
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"> <AdminMenu /></div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder='Select a category'
                                size='large'
                                showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {
                                    categories?.map((cat) => (
                                        <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                    ))
                                }
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary w-100">
                                    {photo ? photo.name : "Upload Image"}
                                    <input type='file' name='photo' id='' style={{ display: 'hidden' }} accept="image/*" onChange={(e) => { setPhoto(e.target.files[0]) }} hidden />
                                </label>
                            </div>

                            <div className="mb-3">
                                {
                                    photo ? (
                                        <div className='text-center'>
                                            <img src={URL.createObjectURL(photo)} height={'200px'}></img>
                                        </div>
                                    ) :
                                        (
                                            <div className='text-center'>
                                                <img src={`${base_url}/api/v1/product/product-photo/${id}`} height={'200px'}></img>
                                            </div>
                                        )
                                }
                            </div>

                            <div className="mb-3">
                                <input
                                    type='text'
                                    value={name}
                                    placeholder='Name of product'
                                    className='form-control'
                                    onChange={(e) => { setName(e.target.value) }}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <textarea
                                    value={description}
                                    placeholder='Description of product ...'
                                    className='form-control'
                                    onChange={(e) => { setDescription(e.target.value) }}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <input
                                    type='number'
                                    value={price}
                                    placeholder='Price of product'
                                    className='form-control'
                                    onChange={(e) => { setPrice(e.target.value) }}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <input
                                    type='number'
                                    value={quantity}
                                    placeholder='Quantity of product'
                                    className='form-control'
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                ></input>
                            </div>

                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={updateHandler}>UPDATE PRODUCT</button>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-danger' onClick={deleteHandler}>DELETE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default UpdateProduct