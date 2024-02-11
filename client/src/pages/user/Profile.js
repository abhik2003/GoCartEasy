import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'

function Profile() {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"> <UserMenu /></div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            User profile
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile