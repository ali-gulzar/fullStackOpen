import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className="blogDiv">
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </div>
    )

}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog
