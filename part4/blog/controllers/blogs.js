const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const resp = await Blog.find({}).populate('user', 'username name id')
    return response.json(resp)
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    blog.user = request.user

    if (blog.likes === undefined) {
        blog.likes = 0 
    }

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).end()
    }    
    const resp = await blog.save() 
    let user = request.user
    user.blogs = user.blogs.concat(resp._id)
    const u = await user.save()
    return response.status(201).json(resp)
})

blogRouter.delete('/:id', async (request, response) => {
    try {
        const deletedObject = await Blog.findById(request.params.id)

        if (deletedObject.user.toString() !== request.user._id.toString()) {
            return response.status(401).json({ error: 'token invalid' })
        }
        
        if (!deletedObject) {
            return response.status(404).end()
        }

        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } catch (err) {
        console.log(err)
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
        console.log(err)
        return response.status(500).end()
    }
})

module.exports = blogRouter