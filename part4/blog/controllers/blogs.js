const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const resp = await Blog.find({})
    return response.json(resp)
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) {
        blog.likes = 0 
    }

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).end()
    }    
    const resp = await blog.save()
    return response.status(201).json(resp)
})

module.exports = blogRouter