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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}