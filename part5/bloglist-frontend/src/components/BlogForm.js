import React, { useState } from 'react'
import blogService from '../services/blogs';

const BlogForm = ({ toggleForm, setMessage }) => {

    const [blog, setBlog] = useState({
        title: '',
        author: '',
        url: ''
    })
  
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
        .catch(() => {
            setMessage("Failed to create a blog")
            setTimeout(() => {
                setMessage(null)
            }, 2000);
        })
    }
  
    return (
        <>
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
        <button type="submit">add</button>
        <button onClick={toggleForm}>cancel</button>
        </form>
        </>
    )
}

export default BlogForm;
