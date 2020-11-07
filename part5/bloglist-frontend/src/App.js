import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [addBlog, setAddBlog] = useState(false)

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
            event.preventDefault()
            try {
                const user = await loginService.login({ username, password })
                blogService.setToken(user.token)
                window.localStorage.setItem(
                    'loggedInUser', JSON.stringify(user)
                )
                setUser(user)
                setMessage('Logged in successfully')
                setTimeout(() => {
                    setMessage(null)
                }, 2000)
            } catch (e) {
                setMessage('Logged in failed')
                setTimeout(() => {
                    setMessage(null)
                }, 2000)
            }
        }

        return (
            <>
                <h1>Login Form</h1>
                <form onSubmit={handleLogin}>
                    <div>
            username
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
            password
                        <input
                            id="password"
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

        return (
            <>
                <h2>blogs</h2>
                <p>{user ? user.name : ''} logged in</p>
                <div>
                    <button className="logoutButton" onClick={handleLogOut}>logout</button>
                </div>
                {addBlog ? <BlogForm toggleForm={() => setAddBlog(false)} setMessage={(value) => setMessage(value)} createBlog={() => console.log('creating blog')} /> : <button onClick={() => setAddBlog(true)} className="addBlogButton">add new</button>}
                {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} setMessage={(value) => setMessage(value)} user={user}/>
                )}
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
