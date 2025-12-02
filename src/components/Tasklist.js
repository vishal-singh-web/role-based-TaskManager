import React, { useContext} from 'react'
import { TaskContext } from '../Context/Taskstate.js';
import Taskitem from './Taskitem.js';

function Tasklist(props) {
    const taskContext = useContext(TaskContext);
    const { tasks } = taskContext;
    return (
        <>
            <div className='mx-3'>
                <div className="my-3">
                    <h1>Your Tasks:</h1>
                </div>
                <div className="row">
                    {tasks.length === 0 && (
                        <div style={{ color: "red" }} className="d-flex justify-content-center align-items-center">
                            <b>NO TASKS FOUND</b>
                        </div>
                    )}

                    {tasks.map((a) => (
                        <div className="col-md-12" key={a._id} >
                            <Taskitem task={a} setMsg={props.setMsg} setShowAlert={props.setShowAlert} setType={props.setType} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tasklist