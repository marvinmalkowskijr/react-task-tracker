import React, { useState} from 'react'



const AddTasks = ( {onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    

    const onSubmit = (e) => {
        e.preventDefault()

        if ((!text) || (!day)) {
            alert('Please Add Text')
            return
        }

        onAdd ({ text, day, reminder })
        setText('')
        setDate('')
        setReminder(false)

    }

    return (
        <form className="add-form" onSubmit={onSubmit}> 
            <div className="form-control">
                <label>Task</label>
                <input type='text' placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type='text' placeholder="Add Day & Task" value={day} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type='checkbox' checked = {reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type='Submit' value='Save Task' className='btn btn-block' />
            
        </form>
    );
};

export default AddTasks;