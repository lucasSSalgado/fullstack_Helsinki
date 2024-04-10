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

blogRouter.delete('/:id', async (request, response) => {
    try {
        const deletedObject = await Blog.findByIdAndDelete(request.params.id)
        
        if (!deletedObject) {
            return response.status(404).end()
        }
        return response.status(204).end()
    } catch (err) {
        return response.status(500).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    try {
        const updateOject = await Blog.findByIdAndUpdate(request.params.id, {...request.body}, { new: true })
        if (!updateOject) {
            return response.status(404).end()
        }

        return response.status(200).json(updateOject)
    }
    catch (err) {
        return response.status(500).end()
    }
})

module.exports = blogRouter