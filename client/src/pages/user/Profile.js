import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Profile() {
    const [auth, setAuth] = useAuth();
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
            const { data } = await axios.put(`${base_url}/api/v1/auth/profile-update`, { name, email, password, phone, address });

            if (data.success) {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated successfully");
            }
            else {
                toast.error(data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"> <UserMenu /></div>
                    <div className="col-md-9">
                        <div className='form-container'>
                            <form onSubmit={handleSubmit}>
                                <h4 className='title'>PROFILE UPDATE</h4>
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
                                        disabled
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

                                <button type="submit" className="btn btn-primary">Update Profile</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile