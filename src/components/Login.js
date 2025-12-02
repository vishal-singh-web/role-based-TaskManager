import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { TaskContext } from '../Context/Taskstate';

function Login() {
    const taskContext = useContext(TaskContext);
    const { getData } = taskContext;
    const [msg, setMsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [type, settype] = useState('success');
    const alert = (msg, condition) => {
        setMsg(msg);
        setShowAlert(true);
        settype(condition);
    }
    useEffect(() => {
        if (showAlert) {
            console.log("Alert called with message:", msg);
            const timeout = setTimeout(() => setShowAlert(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [showAlert]);
    const host = 'https://taskmanager-backend-bnau.onrender.com/api/auth'
    let navigate = useNavigate();
    const [form, setform] = useState({ email: '', password: '' })
    const onchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            const url = `${host}/login`
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "authtoken": localStorage.getItem("token")
                },
                body: JSON.stringify({ email: form.email, password: form.password })
            });
            let data = await response.json()
            if (data.success) {
                localStorage.setItem('token', data.authtoken);
                alert('Successfully Logged in', 'success');
                setTimeout(() => {
                    getData();
                    navigate('/');
                }, 2000);
            } 
            else{
                alert('Invalid credentials, Please try again', 'danger');
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="container my-5">
            <div className="my-5">
                <h1>Login to continue to Task Manager</h1>
            </div>

            <div className={`alert alert-${type} alert-dismissible fade ${showAlert ? 'show' : ''} float-alert`} role="alert">
                {msg}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}></button>
            </div>
            <form onSubmit={handlelogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp" name='email'></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onchange} className="form-control" id="password"></input>
                </div>
                <div id="emailHelp" className="form-text">Don't have an account?<span style={{cursor:"pointer",color:"blue",textDecoration:"underline"}}onClick={()=>{alert('Redirecting...', 'success');setTimeout(() => {
                        navigate('/signup');
                    }, 2000)}}>Signup</span> to use task manager</div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>

    )
}

export default Login