import React, { createContext, useEffect, useState } from 'react'

const TaskContext = createContext();
function Taskstate(props) {
    const [tasks, setTasks] = useState([]);
    const host = 'http://localhost:4000/api/tasks'
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
        setTasks([]);
        getData();
    }, []);
    return (
        <TaskContext.Provider value={{ tasks, setTasks, getData }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export { Taskstate, TaskContext };