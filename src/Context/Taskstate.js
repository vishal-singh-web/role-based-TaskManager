import React, { createContext, useEffect, useState } from 'react'

const TaskContext = createContext();
function Taskstate(props) {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const host = 'https://role-based-taskmanager-backend.onrender.com/api/tasks'
    const authHost = 'https://role-based-taskmanager-backend.onrender.com/api/auth'
    const getUser = async () => {
        const url = `${authHost}/getuser`
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        })
        if (res.ok) {
            const data = await res.json();
            setUser(data);
        }
    }
    const getData = async () => {
        const url = `${host}/fetchtasks`
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        })
        if (!res.ok) {
            console.log("fetchtasks failed, status:", res.status);
            return;
        }
        const data = await res.json();
        setTasks([...data]);
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setTasks([]);
            getData();
            getUser();
        }
    }, []);
    return (
        <TaskContext.Provider value={{ tasks, setTasks, getData, user, setUser, getUser }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export { Taskstate, TaskContext };