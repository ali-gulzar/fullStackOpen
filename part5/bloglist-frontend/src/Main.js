import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initData } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'

const Details = ({ blog }) => {

    if (!blog) return null

    const dispatch = useDispatch()

    const updateLikes = async () => {
        const response = await blogService.updateLikes({ ...blog, likes: blog.likes + 1, user: blog.user.id }, blog.id)
        blog = response.data.data
        dispatch(setMessage('Blog liked'))
        setTimeout(() => {
            dispatch(setMessage(''))
        }, 2000)
    }

    // const deleteBlog = async () => {
    //     if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    //         const response = await blogService.deletePost(blog.id)
    //         if (response.status === 201) {
    //             dispatch(setMessage('Blog deleted'))
    //             setTimeout(() => {
    //                 dispatch(setMessage(''))
    //             }, 2000)
    //         } else {
    //             dispatch(setMessage('Failed to delete a blog'))
    //             setTimeout(() => {
    //                 dispatch(setMessage(''))
    //             }, 2000)
    //         }
    //     }
    // }

    return (
        <div className="detailsDiv">
            <h1>{blog.title}</h1>
            <p>{blog.url}</p>
            <p className="likeContainer">{blog.likes}<button onClick={updateLikes} className="likeButton">like</button></p>
            <p>added by {blog.author}</p>
        </div>
    )
}

const Main = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [addBlog, setAddBlog] = useState(false)

    const message = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
        blogService.getAll().then(response =>
            dispatch(initData(response))
        )
    }, [dispatch, blogs])

    const loginForm = () => {

        const handleLogin = async (event) => {
            event.preventDefault()
            try {
                const user = await loginService.login({ username, password })
                blogService.setToken(user.token)
                window.localStorage.setItem(
                    'loggedInUser', JSON.stringify(user)
                )
                dispatch(setUser(user))
                dispatch(setMessage('Logged in successfully'))
                setTimeout(() => {
                    dispatch(setMessage(''))
                }, 2000)
            } catch (e) {
                dispatch(setMessage('Logged in failed'))
                setTimeout(() => {
                    setMessage('')
                }, 2000)
            }
        }

        return (
            <>
                <h1>Login Form</h1>
                <form onSubmit={handleLogin}>
                    <div>
            username
                        <TextField id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
            password
                        <TextField
                            id="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <Button variant="contained" color="primary" type="sumbit">login</Button>
                </form>
            </>
        )
    }

    const blogList = () => {

        const handleLogOut = () => {
            window.localStorage.removeItem(
                'loggedInUser', JSON.stringify(user)
            )
            dispatch(setUser(null))
            setUsername('')
            setPassword('')
        }

        const blogById = id => blogs.find(b => b.id === id)

        const match = useRouteMatch('/blog/:id')
        const detailBlog = match ?  blogById(match.params.id) : null

        return (
            <>
                <h2>blogs</h2>
                <p>{user ? user.name : ''} logged in</p>
                <Switch>
                    <Route path="/blog/:id">
                        <Details blog={detailBlog} />
                    </Route>
                    <Route path="/">
                        <div>
                            <button className="logoutButton" onClick={handleLogOut}>logout</button>
                        </div>
                        {addBlog ? <BlogForm toggleForm={() => setAddBlog(false)} createBlog={() => console.log('creating blog')} /> : <button onClick={() => setAddBlog(true)} className="addBlogButton">add new</button>}
                        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                            <Blog key={blog.id} blog={blog} user={user}/>
                        )}
                    </Route>
                </Switch>

            </>
        )
    }

    return (
        <div>
            <p>{message}</p>
            {user === null ? loginForm() : blogList() }
        </div>
    )
}

export default Main
