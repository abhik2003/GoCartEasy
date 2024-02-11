import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <Layout title={"go back- page not found"}>
            <div className="pnf">
                <h1 className="pnf-title">404</h1>
                <h2 className="pnf-heading">Oops ! Page Not Found</h2>
                <Link onClick={navigate(-1)} className="pnf-btn">
                    Go Back
                </Link>
            </div>
        </Layout>
    )
}

export default PageNotFound