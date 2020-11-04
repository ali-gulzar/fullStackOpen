const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    
    const body = request.body
    let decodedToken;

    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch {
        return response.status(401).json({ error: 'Invalid token' })
    }
    if (!request.token || !decodedToken.id) {
        response.status(401).json({ error: 'token missing or invalid' })
    }
    let blog;
    let user;
    try {
        user = await User.findById(decodedToken.id)
        blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
    } catch (e) {
        response.status(404).json(e)
    }

    if (blog.url === undefined || blog.title === undefined) {
        response.status(400).json({error: "url and title are not defined"})
    } else {
        await blog.save()
        user.blogs = user.blogs.concat(blog.id)
        await user.save()
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