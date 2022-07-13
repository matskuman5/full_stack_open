const ld = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length
    ? blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    : {}
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return {}

  const authors = blogs.map(blog => blog.author)

  const most_prolific = authors.sort((a, b) =>
    authors.filter(c => c === a).length
    - authors.filter(c => c === b).length
  ).pop()

  const blog_amount = blogs.filter(b => b.author === most_prolific).length

  return {
    author: most_prolific,
    blogs: blog_amount
  }

}

const mostLikes = (blogs) => {

  if (blogs.length === 0) return {}

  const unique_authors = ld.uniq(blogs.map(blog => blog.author))

  let authors_with_likes = []

  unique_authors.forEach(author => {
    let likes = 0
    blogs.forEach(blog => {
      if (blog.author === author) likes += blog.likes
    })
    authors_with_likes.push({
      author: author,
      likes: likes
    })
  })

  return authors_with_likes.reduce((max, author) => max.likes > author.likes ? max : author)

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}