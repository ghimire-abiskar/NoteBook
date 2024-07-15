import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = "http://localhost:5000";
    const history = useNavigate(); 
    const [credent, setcredent] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setcredent({ ...credent, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credent.email, password: credent.password })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                history("/");
                props.showAlert("Logged in successfully" ,"success")
            } else {
                props.showAlert("Invalid credentials" ,"danger")
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={credent.email} onChange={handleChange} type="email" className="form-control" name='email' id="email" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={credent.password} onChange={handleChange} type="password" className="form-control" id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Login;
