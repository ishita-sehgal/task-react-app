import {useState} from 'react'

const AddTask = ({onAdd}) => {
    //component level state not app level
    const [title,setTitle]=useState('')   //default argument in useState hook is ''
    const [reminder,setReminder]=useState(false)
    const onSubmit=(e)=>{
        if(!title){
            alert('please add task');
            return;
        }
        onAdd({title,reminder});
        setTitle('')
        setReminder(false);
e.preventDefault()
    }

    //return part

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control '>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder} checked={reminder}  onChange={(e)=>{setReminder(e.currentTarget.checked)}}/>

            </div>
            <input className='btn btn-block' type='submit' value='Save Task'/>
        </form>
    )
}

export default AddTask
