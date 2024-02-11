import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    //form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const base_url = process.env.REACT_APP_API;
            const res = await axios.post(`${base_url}/api/v1/auth/login`, { email, password });

            if (res.data.success) {
                toast.success(res.data.message);
                //authentication done so set the data
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })

                localStorage.setItem('auth', JSON.stringify(res.data));

                //after log in is done navigate to the Requested page (if any) by using state which was set in Spinner.js 

                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }
    return (
        <Layout title="Login - Ecommerce App">
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>LOG IN TO YOUR ACCOUNT</h4>


                    <div className="mb-2">
                        <label htmlFor="input-email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="input-email"
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="input-password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="input-password"
                            placeholder='Enter Your Passowrd'
                            required
                        />
                    </div>

                    <div style={{ textAlign: "center" }} className="mb-2">
                        <button type="submit" className="btn btn-primary" >Sign In</button>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login