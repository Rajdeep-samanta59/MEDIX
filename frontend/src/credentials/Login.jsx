import React, { useState } from 'react';
import axios from 'axios';
// import './Header.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {
// useNavigate is used to programmatically redirect users after login.
    let nav= useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
// Called whenever the user types into the form.// Dynamically updates the formData state for both fields
    const handleChange = (e) => {
        const { name, value } = e.target;//e.target refers to the input element that triggered the change.
        // name is the name attribute of that input (e.g., "username" or "password").}}{{value is what the user typed.
        setFormData(prevState => ({ 
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (ie preventing page reload)
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:8080/login',{formData});

            console.log(response.data.data);

            if (response.data.data) {

                const token= response.data.data;
                localStorage.setItem('token', token);
                nav('/');
               
            } 
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <h2 className="m-auto">Login At Medix App</h2>
            <div className="Log mb-5 mt-5">
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="row">
                        <div className="m-auto pb-4 col-md-8 col-sm-7 col-6">
                            <label htmlFor="username" className="form-label">UserName</label>
                            <input type="text" name="username" className="form-control" id="username" placeholder="Enter username" value={formData.username} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className=" m-auto pb-4 col-md-8 col-sm-7 col-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-success m-auto col-2">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
