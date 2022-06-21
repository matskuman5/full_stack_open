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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}