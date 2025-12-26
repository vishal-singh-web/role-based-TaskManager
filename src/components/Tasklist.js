import React, { useContext} from 'react'
import { TaskContext } from '../Context/Taskstate.js';
import Taskitem from './Taskitem.js';

function Tasklist(props) {
    const taskContext = useContext(TaskContext);
    const { tasks, user } = taskContext;

    const groupTasksByUser = (tasks) => {
        const grouped = {};
        tasks.forEach(task => {
            const userKey = task.user ? `${task.user.name} (${task.user.email})` : 'Unknown User';
            if (!grouped[userKey]) {
                grouped[userKey] = [];
            }
            grouped[userKey].push(task);
        });
        return grouped;
    };

    const groupedTasks = user && user.role === 'admin' ? groupTasksByUser(tasks) : null;

    return (
        <>
            <div className='mx-3'>
                <div className="my-3">
                    <h1>{user && user.role === 'admin' ? 'All Tasks:' : 'Your Tasks:'}</h1>
                </div>
                {user && user.role === 'admin' ? (
                    Object.keys(groupedTasks).map(userKey => (
                        <div key={userKey}>
                            <h3>{userKey}</h3>
                            <div className="row">
                                {groupedTasks[userKey].length === 0 ? (
                                    <div style={{ color: "red" }} className="d-flex justify-content-center align-items-center">
                                        <b>NO TASKS FOUND</b>
                                    </div>
                                ) : (
                                    groupedTasks[userKey].map((task) => (
                                        <div className="col-md-12" key={task._id}>
                                            <Taskitem task={task} setMsg={props.setMsg} setShowAlert={props.setShowAlert} setType={props.setType} />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="row">
                        {tasks.length === 0 && (
                            <div style={{ color: "red" }} className="d-flex justify-content-center align-items-center">
                                <b>NO TASKS FOUND</b>
                            </div>
                        )}

                        {tasks.map((task) => (
                            <div className="col-md-12" key={task._id}>
                                <Taskitem task={task} setMsg={props.setMsg} setShowAlert={props.setShowAlert} setType={props.setType} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Tasklist