import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
    const host = "http://localhost:5000";
    const history = useNavigate();
    const [credent, setcredent] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setcredent({ ...credent, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/createuser`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credent.name, email: credent.email, password: credent.password })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            if (json.success) {
                localStorage.setItem("token", json.authtoken)
                history("/")
                props.showAlert("Logged in successfully", "success")
            }
            else {
                props.showAlert("Invalid credentials", "danger")
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className='container'>
            <h3>Login to continue using the notebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="my-3 form-group">
                    <label htmlFor="name">Name:</label>
                    <input onChange={handleChange} value={credent.name} type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="my-3 form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleChange} value={credent.email} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="my-3 form-group">
                    <label htmlFor="password">Enter your password:</label>
                    <input onChange={handleChange} value={credent.password} type="password" className="form-control" id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
