import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TaskContext } from '../Context/Taskstate';

function Navbar() {
    const {getData,setTasks } = useContext(TaskContext);
    let navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('token');
        setTasks([]);
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="https://icon-library.com/images/task-manager-icon/task-manager-icon-23.jpg" alt="Logo" width="30" className="d-inline-block align-text-top mx-2"></img>
                    Task Manager
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            {!localStorage.getItem('token') ? <form className='d-flex'>
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form> : <button className="btn btn-primary mx-2" onClick={handlelogout}>Logout</button>}
        </nav>
    )
}

export default Navbar