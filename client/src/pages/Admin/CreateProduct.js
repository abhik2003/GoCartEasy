import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
// import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');

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
        getAllCategory();
    }, []);

    //submit handler
    const submitHandler = async (e) => {
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
            const { data } = await axios.post(`${base_url}/api/v1/product/create-product`, productdat);

            if (data?.success) {
                toast.success('Product added successfully');
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

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"> <AdminMenu /></div>
                    <div className="col-md-9">
                        <h1>Add new product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder='Select a category'
                                size='large'
                                showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}
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
                                    photo && (
                                        <div className='text-center'>
                                            <img src={URL.createObjectURL(photo)} height={'200px'}></img>
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
                                <button className='btn btn-primary' onClick={submitHandler}>CREATE PRODUCT</button>
                            </div>

                            {/* {name}{description}{price}{quantity}{category} */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default CreateProduct