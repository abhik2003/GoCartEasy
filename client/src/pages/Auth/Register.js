import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    //form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const base_url = process.env.REACT_APP_API;
            const res = await axios.post(`${base_url}/api/v1/auth/register`, { name, email, password, phone, address });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
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
        <Layout title="Register - Ecommerce App">
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>REGISTER FORM</h4>
                    <div className="mb-2">
                        <label htmlFor="input-name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="input-name"
                            placeholder='Enter Your Name'
                            required
                        />
                    </div>

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

                    <div className="mb-2">
                        <label htmlFor="input-address" className="form-label">
                            Address
                        </label>
                        <input type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="input-address"
                            placeholder='Enter Your Address'
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="input-phone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="input-phone"
                            placeholder='Enter Your Phone Number'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register