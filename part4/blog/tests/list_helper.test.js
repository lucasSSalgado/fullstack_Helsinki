const supertest = require('supertest')
const { test, describe, after, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []
      
        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    }) 
})

describe('total likes', () => {
    const emptyBLog = []
    const singleBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
    ]
    const blogs = [
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        } 
    ]
  
    test('When list is empty return zero', () => {
      const result = listHelper.totalLikes(emptyBLog)
      assert.strictEqual(result, 0)
    })
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(singleBlog)
        assert.strictEqual(result, 7)
    })
    test('when list has many blogs, return the sum', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 27)
    })
    //singleBlog
})

describe('favorite blog', () => {
    const empty = []
    const blogs = [
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        } 
    ]

    test('when empty list return undefined', () => {
        const result = listHelper.favoriteBlog(empty)
        assert.strictEqual(result, undefined)
    })
    test('when empty has many blogs return the bigger like', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})

describe('most blogs', () => {
    const empty = []
    const onlyOne = [
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          }
    ]
    const blogs = [
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        } 
    ]
    const tie = [
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          }
    ]

    test('when empty list return undefine', () => {
        const result = listHelper.mostBlogs(empty)
        assert.strictEqual(result, undefined)
    })
    test('when only one return the author', () => {
        const result = listHelper.mostBlogs(onlyOne)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })
    test('when many, return the most active', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 2
        })
    })
    test('when tie, return the first', () => {
        const result = listHelper.mostBlogs(tie)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })
})

describe('most likes', () => {
    const empty = []
    const onlyOne = [
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }
    ]
    const blogs = [
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 17,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        } 
    ]

    test('when empty list return undefine', () => {
        const result = listHelper.mostLikes(empty)
        assert.deepEqual(result, undefined)
    })
    test('when only one return the author', () => {
        const result = listHelper.mostLikes(onlyOne)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
    test('when many, return the most liked', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

describe('Api Blog tests', () => {
    before(async () => {
        await Blog.deleteMany({});
        const b1 = new Blog({title: "title 1", author: "author1", url: "url1", likes: 10})
        const b2 = new Blog({title: "title 2", author: "author2", url: "url2", likes: 10})
        await b1.save()
        await b2.save() 
    })
    
    after(async () => {
        await mongoose.connection.close();
    })

    test('check json response', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    test('check number of blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 2)
    })
    test('check _id dosent exists', async () => {
        const response = await api.get('/api/blogs')
        const first = response.body[0]

        assert.ok(first.id)
        assert.strictEqual(first._id, undefined)
    })
    test('post test', async () => {
        const response = await api.post('/api/blogs')
            .send({
                title: "title 3", 
                author: "author3", 
                url: "url3"
            })

        assert.deepEqual(response.body.title, "title 3")

        const allBlogs  =  await api.get('/api/blogs')
        assert.strictEqual(allBlogs.body.length, 3)
    })
    test('test likes equal zero when not provided', async () => {
        const response = await api.post('/api/blogs')
            .send({
                title: "title 4", 
                author: "author4", 
                url: "url4"
            })

        assert.strictEqual(response.body.likes, 0)
    })
    test('title undefined', async () => {
        const response = await api.post('/api/blogs')
            .send({
                author: "author5", 
                url: "url5", 
                likes: 50
            })

        assert.strictEqual(response.status, 400)
    })
    test('url undefined', async () => {
        const response = await api.post('/api/blogs')
            .send({
                title: "title 5",
                author: "author5", 
                likes: 50
            })

        assert.strictEqual(response.status, 400)
    })
    test('test delete success', async () => {
        // get some existing id
        const blog = await api.get('/api/blogs')
        const first = blog.body[0].id
        // delete id
        const response = await api.delete(`/api/blogs/${first}`)
        assert.strictEqual(response.status, 204)
    })
    test('test delete  404', async () => {
        const response = await api.delete('/api/blogs/5a422b3a1b54a676234d17f6')
        assert.strictEqual(response.status, 404)
    })
    test('test delete 500', async () => {
        const response = await api.delete('/api/blogs/5a422b3a1b234d17f6')
        assert.strictEqual(response.status, 500)
    })
    test('test update success', async () => {
        // get some existing id
        const blog = await api.get('/api/blogs')
        const first = blog.body[0].id
        // update id
        const response = await api.put(`/api/blogs/${first}`)
            .send({
                title: "update title", 
                author: "author3", 
                url: "url3",
                likes: 500
            })

        assert.strictEqual(response.status, 200)
        assert.strictEqual(response.body.likes, 500)
        assert.strictEqual(response.body.title, "update title")
    })
    test('test update 404', async () => {
        const response = await api.put('/api/blogs/5a422b3a1b54a676234d17f6')
            .send({
                title: "update title", 
                author: "author3", 
                url: "url3",
                likes: 500
            })

        assert.strictEqual(response.status, 404)
    })
    test('test update 505', async () => {
        const response = await api.put('/api/blogs/5a4234d17f6')
            .send({
                title: "update title", 
                author: "author3", 
                url: "url3",
                likes: 500
            })

        assert.strictEqual(response.status, 500)
    })
})

describe('Api user test', () => {
    test('invalid username returun 400', async () => {
        const response = await api.post('/api/users')
            .send({
                username: "ab", 
                name: "name", 
                password: "123456"
            })
        assert.deepEqual(response.status, 400)
    })
    test('invalid password returun 400', async () => {
        const response = await api.post('/api/users')
            .send({
                username: "abc", 
                name: "name", 
                password: "12"
            })
        assert.deepEqual(response.status, 400)
    })

})
