const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs)  => {
    let max = 0
    let choosen
    if (blogs.length === 0) {
        return undefined
    }

    for (i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > max) {
            max = blogs[i].likes
            choosen = blogs[i]
        }
    }

    return {
        title: choosen.title,
        author: choosen.author,
        likes: choosen.likes
    }
}
const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    let map = new Map()

    for (i = 0; i < blogs.length; i++) {
        if (map.has(blogs[i].author)) {
            map.set(blogs[i].author, map.get(blogs[i].author) + 1)
        } else {
            map.set(blogs[i].author, 1)
        }
    }

    let activeAuthor
    let  max = 0
    map.forEach((value, key) => {
        console.log(value)
        if (value > max) {
            max = value
            activeAuthor = key
        }
    })

    return {
        author: activeAuthor,
        blogs: max
    }    
}
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    let map = new Map()

    for (i = 0; i < blogs.length; i++) {
        if (map.has(blogs[i].author)) {
            map.set(blogs[i].author, map.get(blogs[i].author) + blogs[i].likes)
        } else {
            map.set(blogs[i].author, blogs[i].likes)
        }
    }

    let mostPopular
    let maxLikes = 0
    map.forEach((value, key) => {
        if (value > maxLikes) {
            maxLikes = value
            mostPopular = key
        }
    })

    return {
        author: mostPopular,
        likes: maxLikes
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}