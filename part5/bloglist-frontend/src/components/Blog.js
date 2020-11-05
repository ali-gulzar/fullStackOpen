import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Blog = ({ blog, setMessage, user }) => {

  const [showDetail, setShowDetail] = useState(false)

  const details = (blog) => {

    const updateLikes = async () => {
      const response = await blogService.updateLikes({ ...blog, likes: blog.likes + 1, user: blog.user.id }, blog.id)
      blog = response.data.data
      setMessage('Blog liked')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }

    const deleteBlog = async () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const response = await blogService.deletePost(blog.id)
        if (response.status === 201) {
          setMessage('Blog delete')
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        } else {
          setMessage('Failed to delete a blog')
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        }
      }
    }

    return (
      <>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={updateLikes}>like</button></p>
        <p>{blog.author}</p>
        {user.username === blog.user.username ? <button onClick={deleteBlog}>delete</button> : ''}
      </>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => showDetail ? setShowDetail(false) : setShowDetail(true)}>{showDetail ? 'hide' : 'show'}</button>
      {showDetail ? details(blog) : ''}
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
