const _ = require("lodash");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((prev, curr) => {
        return prev.likes > curr.likes ? prev : curr
    }, {})
    return blog
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return {};
    }

    const authors = blogs.map(blog => blog.author)
    const favoriteAuthor = _.head(_(authors)
    .countBy()
    .entries()
    .maxBy(_.last))
    const amountOfBlogs = authors.filter(author => author === favoriteAuthor).length
    return { author: favoriteAuthor, blogs: amountOfBlogs }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return {};
    }

    return { author: favoriteBlog(blogs).author, likes: favoriteBlog(blogs).likes }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}