import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({ id, task, onDelete, onToogle}) => {

  return (
    <div className='task' onDoubleClick={() => onToogle(task.id)}>
      <h3 >
        {task.id} {task.text}  <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={
            () => onDelete(task.id)} />
      </h3>
      <p>{task.day}</p>
      <p>{ task.reminder  ? 'True' : 'False' } </p> 


    </div>
  )
}


export default Task