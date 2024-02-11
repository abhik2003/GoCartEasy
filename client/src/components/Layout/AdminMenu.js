import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>AdminPanel</h4>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">Add new Product</NavLink>
                    <NavLink to="/dashboard/admin/all-products" className="list-group-item list-group-item-action">All Products</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                </div>

            </div>

        </>

    )
}

export default AdminMenu