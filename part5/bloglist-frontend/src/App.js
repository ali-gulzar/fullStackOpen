import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        setUser(user)
    }
  }, [])

  const loginForm = () => {

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const user = await loginService.login({username, password})
        blogService.setToken(user.token)
        window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
        )
        setUser(user)
        setMessage("Logged in successfully")
        setTimeout(() => {
          setMessage(null)
        }, 2000);
      } catch {
        setMessage("Logged in failed")
        setTimeout(() => {
          setMessage(null)
        }, 2000);
      }

    }

    return (
      <>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }

  const blogList = () => {

    const handleLogOut = () => {
      window.localStorage.removeItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(null)
      setUsername('')
      setPassword('')
    }

    const handleCreateNewBlog = (event) => {
      event.preventDefault();
      blogService.createNew(blog).then((response) => {
        if (response.status === 201) {
          setMessage("Blog created")
          setBlog({title: '', author: '', url: ''})
        } else {
          setMessage("Failed to create a blog")
        }
        setTimeout(() => {
          setMessage(null)
        }, 2000);
      })
    }

    return (
      <>
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <button onClick={handleLogOut}>logout</button>
      <h2>create new</h2>

        <form onSubmit={handleCreateNewBlog}>
          <div>
            title
            <input
              type="text"
              value={blog.title}
              name="Title"
              onChange={({ target }) => setBlog({...blog, title: target.value})}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={blog.author}
              name="Author"
              onChange={({ target }) => setBlog({...blog, author: target.value})}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={blog.url}
              name="URL"
              onChange={({ target }) => setBlog({...blog, url: target.value})}
            />
          </div>
          <button type="submit">add new</button>
        </form>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
      </>
    )
  }

  return (
    <div>
      {message === null ? <p></p> : <p>{message}</p>}
      {user === null ? loginForm() : blogList() }
    </div>
  )
}

export default App
