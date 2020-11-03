const blogRouter = require('express').Router();
const Blog = require('../models/blogs');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (blog.url === undefined || blog.title === undefined) {
        response.status(400).end()
    } else {
        await blog.save()
        response.status(201).json(blog)
    }    
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(201)
})

module.exports = blogRouter;