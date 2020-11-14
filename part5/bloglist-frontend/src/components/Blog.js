import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'

import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

    const [showDetail, setShowDetail] = useState(false)
    const dispatch = useDispatch()

    const details = (blog) => {

        const updateLikes = async () => {
            const response = await blogService.updateLikes({ ...blog, likes: blog.likes + 1, user: blog.user.id }, blog.id)
            blog = response.data.data
            dispatch(setMessage('Blog liked'))
            setTimeout(() => {
                dispatch(setMessage(''))
            }, 2000)
        }

        const deleteBlog = async () => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                const response = await blogService.deletePost(blog.id)
                if (response.status === 201) {
                    dispatch(setMessage('Blog deleted'))
                    setTimeout(() => {
                        dispatch(setMessage(''))
                    }, 2000)
                } else {
                    dispatch(setMessage('Failed to delete a blog'))
                    setTimeout(() => {
                        dispatch(setMessage(''))
                    }, 2000)
                }
            }
        }

        return (
            <div className="detailsDiv">
                <p>{blog.url}</p>
                <p className="likeContainer">{blog.likes}<button onClick={updateLikes} className="likeButton">like</button></p>
                <p>{blog.author}</p>
                {user.username === blog.user.username ? <button className="deleteButton" onClick={deleteBlog}>delete</button> : ''}
            </div>
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
        <div style={blogStyle} className="blogDiv">
            <p>{blog.title} <button className="showBlogButton" onClick={() => showDetail ? setShowDetail(false) : setShowDetail(true)}>{showDetail ? 'hide' : 'show'}</button></p>
            {showDetail ? details(blog) : ''}
        </div>
    )

}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog
