import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const User = ({ user }) => {

    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        blogService.getAll().then(blogs => {
            if (user !== undefined) {
                const filteredBlogs = blogs.filter(blog => user.blogs.includes(blog.id))
                setBlogs(filteredBlogs)
            }
        })
    },[user])

    if (!user || !blogs) return null

    return (
        <div>
            <h1>{user.name}</h1>
            <p>added blogs</p>
            <ul>
                {blogs.map(blog => {
                    return (
                        <li key={blog.id}>{blog.title}</li>
                    )
                })}
            </ul>

        </div>
    )
}

export default User