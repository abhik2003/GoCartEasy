import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import 'antd/dist/reset.css';
import { Modal } from 'antd';

function CreateCategory() {
    const [categories, setCategories] = useState([]);

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
    }, [])

    //form handler handleSubmit, value, setValue
    //create new category handler
    const [newCategory, setNewcategory] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("Creating category");
            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.post(`${base_url}/api/v1/category/create-category`, { name: newCategory });
            if (data.success) {
                toast.success("Category added successfully")
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in form submission")
        }
    }



    //Modal--------------------------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //----------------------------------

    //selected category which will be updated
    const [selected, setSelected] = useState(null);
    //updated name which will be set
    const [updateCatName, setUpdatedCatName] = useState("");
    //update category handler
    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.put(`${base_url}/api/v1/category/update-category/${selected._id}`, { name: updateCatName });
            if (data.success) {
                toast.success("Category updated successfully")
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
            setIsModalOpen(false);

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    //delete category handler
    const deleteHandler = async (id) => {
        // e.preventDefault();
        try {
            const base_url = process.env.REACT_APP_API;
            const { data } = await axios.delete(`${base_url}/api/v1/category/delete-category/${id}`);
            if (data.success) {
                toast.success("Category deleted successfully")
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
            setIsModalOpen(false);

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"> <AdminMenu /></div>
                    <div className="col-md-9">

                        <div className="w-75 m-auto">
                            <h1>Manage category</h1>
                            <div className="p-3">
                                <CategoryForm handleSubmit={submitHandler} value={newCategory} setValue={setNewcategory} submitType={"Create Category"} />
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Category Name</th>
                                        <th scope="col" className='text-center'>Manage</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        categories?.map((cat) => (
                                            <tr key={cat._id}>
                                                <td>{cat.name}</td>
                                                <td className='text-center'>
                                                    <button className='btn btn-primary m-3 mb-0 mt-0' onClick={() => { showModal(); setSelected(cat); setUpdatedCatName(cat.name) }}>Edit</button>
                                                    <button className='btn btn-danger m-3 mb-0 mt-0' onClick={() => { deleteHandler(cat._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal type="primary" title="Update Category" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <div className="p-3">
                        <CategoryForm handleSubmit={updateHandler} value={updateCatName} setValue={setUpdatedCatName} submitType={"Update"} />
                    </div>
                </Modal>
            </div>
        </Layout>
    )
}

export default CreateCategory