import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = () => {
    fetch('http://127.0.0.1:8000/api/tasks', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setTasks(data)
      })
  }

  const addTask = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/tasks',
      headers: { 'Content-Type': 'application/json' },
      data: {
        title,
        description,
        completed,
      },
    }
    axios.request(options).then((response) => {
      getTasks()
    })
  }

  const deleteTask = (id) => {
    const options = { method: 'DELETE', url: `http://127.0.0.1:8000/api/tasks/${id}` }

    axios.request(options).then((response) => {
      getTasks()
    })
  }

  return (
    <main className='container'>
      <h1 className='display-4'>App.js</h1>

      <form onSubmit={addTask} className='mb-3'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control mb-3 '
          type='text'
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='form-control mb-3 '
          name=''
        ></textarea>
        <input
          value={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className='form-check mb-3 '
          type='checkbox'
        />

        <button className='btn btn-info '>Save</button>
      </form>

      <ul className='list-group'>
        {tasks.map((task) => {
          return (
            <li
              className='d-flex align-items-center justify-content-between list-group-item'
              key={task.id}
            >
              <p>{task.title}</p>

              <div>
                <span className={task.completed ? 'bg-success badge' : 'bg-warning badge'}>
                  {task.completed ? 'done' : 'non completed'}
                </span>

                <button onClick={() => deleteTask(task.id)} className='btn btn-sm btn-danger'>
                  delete
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
