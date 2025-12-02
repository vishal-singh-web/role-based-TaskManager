import React, { useContext, useRef, useState } from 'react'
import "../App.css"
import { TaskContext } from '../Context/Taskstate';

function Taskitem(props) {
    const { _id, title, description, status, priority } = props.task;

    const alert = (message, condition) => {
        props.setMsg(message);
        props.setType(condition);
        props.setShowAlert(true);
    };

    const taskContext = useContext(TaskContext);
    const { tasks, setTasks } = taskContext;
    const host = 'http://localhost:4000/api/tasks'
    const handledelete = async () => {
        try {
            const url = `${host}/deletetask/${_id}`;
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authtoken: localStorage.getItem("token"),
                },
            });

            if (!res.ok) {
                console.log("delete failed, status:", res.status);
                alert("Task deletion failed, Please try again.", "danger");
                return;
            }
            setTasks(tasks.filter((ele) => ele._id !== _id));
            alert("Task deleted Successfully.", "success");

        } catch (err) {
            console.error("delete error:", err);
            alert("Task deletion failed, Please try again.", "danger");
        }
    };

    const ref = useRef(null);
    const refClose = useRef(null);
    const edittask = () => {
        ref.current.click();
    }
    const savetask = async () => {
        try {
            const url = `${host}/updatetask/${_id}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authtoken: localStorage.getItem("token"),
                },
                body: JSON.stringify(editTask),
            });

            if (!res.ok) {
                console.log("update failed, status:", res.status);
                return;
            }

            const updated = await res.json();

            setTasks(
                tasks.map((t) => (t._id === _id ? updated : t))
            );
            alert("Task edited Successfully.", "success");
            refClose.current.click();
        } catch (err) {
            console.error("update error:", err);
            alert("Task edit failed, please try again.", "danger");
        }
    }
    const [editTask, setEditTask] = useState({
        title,
        description,
        priority,
        status,
    });

    const onchange = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value });
    };
    const modalId = `editTask-${_id}`;
    const bgColor =
        status === "Completed"
            ? "#AFE1AF"
            : status === "In-Progress"
                ? "#FFFF8F"
                : "#F88379";
    const prColor =
        priority === "High"
            ? "danger"
            : priority === "Medium"
                ? "warning"
                : "secondary";

    const stColor =
        status === "Completed"
            ? "success"
            : status === "In-Progress"
                ? "warning"
                : "secondary";

    return (
        <>
            <button type="button" data-bs-target={`#${modalId}`} ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal"></button>
            <div className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-labelledby={`${modalId}-label`}
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}-label`} >Edit Task</h1>
                            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row g-2 align-items-stretch">
                                    <div className="col-md-12 d-flex flex-column gap-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Title"
                                            name="title"
                                            value={editTask.title}
                                            onChange={onchange}
                                            required
                                            minLength={3}
                                        />
                                        <textarea
                                            className="form-control"
                                            placeholder="Description"
                                            name="description"
                                            value={editTask.description}
                                            onChange={onchange}
                                            minLength={5}
                                            rows={3}
                                        />
                                        <div className="row g-2 align-items-center">
                                            <div className="col-md-6 d-flex align-items-center">
                                                <span className="me-2 fw-semibold">Priority:</span>
                                                <select
                                                    className="form-select"
                                                    name="priority"
                                                    value={editTask.priority}
                                                    onChange={onchange}
                                                >
                                                    <option>Low</option>
                                                    <option>Medium</option>
                                                    <option>High</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center">
                                                <span className="me-2 fw-semibold">Status:</span>
                                                <select
                                                    className="form-select"
                                                    name="status"
                                                    value={editTask.status}
                                                    onChange={onchange}
                                                >
                                                    <option>Pending</option>
                                                    <option>In-Progress</option>
                                                    <option>Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={savetask} className="btn btn-primary">Save Task</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mx-3 my-3" style={{ backgroundColor: bgColor }}>
                <div className="card-body">
                    <h5 className="card-title">{editTask.title}</h5>
                    <p className="card-text">{editTask.description}</p>
                    <div className='d-flex justify-content-end gap-3'>
                        <span className={`badge text-bg-${prColor}`}>Priority: {priority}</span>
                        <span className={`badge text-bg-${stColor}`}>Status: {status}</span>
                        <i onClick={handledelete} className="fa-solid fa-trash-can"></i>
                        <i onClick={edittask} className="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Taskitem