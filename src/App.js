import React, { useState, useEffect } from 'react'


import Header from './compontents/Header'
import Tasks from './compontents/Tasks'
import AddTasks from './compontents/AddTasks'
import Footer from './compontents/Footer'
import About from './compontents/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }


  const addTask = async (task) => {
    //const id = Math.floor(Math.random() * 10000 + 1)
    //const newTask = { id, ...task }

    const res = await fetch(`http://localhost:5000/tasks`,
      {
        method: 'POST',
        headers:
        {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const data = await res.json()
    setTasks([...tasks, data])
    //setTasks([...tasks, newTask])

  }

  //Delete Task 
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`,
      { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  //Toogle Reminder
  const toogleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updatetask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers:
        {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatetask)
      })

    await res.json()

    // go thru the tasks and if the task matches the id then swap it
    setTasks(
      tasks.map(
        (task) => task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }



  return (
    <Router>   <div className="container">
    {/* Toogles the show form back and forth */}
    <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} /> 

      <Routes>
        <Route path='/'
          element= {
            <>  
              {
                showAddTask && <AddTasks onAdd={addTask} />
              }
              {
                tasks.length > 0 ?
                  <Tasks tasks={tasks} onDelete={deleteTask} onToogle={toogleReminder} />
                  : 'No Tasks'
              }
            </>
          } />

        <Route path='/about' element={<About/>} />

      </Routes>

      <Footer />
    </div>
    </Router>

  );
}

export default App;
