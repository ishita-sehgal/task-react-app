import { FaTimes } from 'react-icons/fa'
function Task({task,onDelete,onToggle}) {

    return (
        <div className={`task ${task.reminder?'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3>
               {task.title} <FaTimes style={{color:'red',cursor:'pointer'}} onClick={()=>onDelete(task.id)}/>
            </h3>
        </div>
    )
}

export default Task
