import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const like = () => {
    try {
      blogService.likeBlog(blog);
    } catch (exception) {
      console.error(exception);
    }
  };

  const deleteThisBlog = () => {
    if (window.confirm(`really delete ${blog.title}?`)) {
      try {
        blogService.deleteBlog(blog);
      } catch (exception) {
        console.error(exception);
      }
    }
  };

  return (
    <div>
      {expanded ? (
        <div>
          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            onClick={toggleExpanded}
          >
            {blog.title}
          </Button>
          <div className="expandedInfo">
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>
              Likes: {blog.likes}
              <Button onClick={like}>like</Button>
            </p>
            <p>Added by: {blog.user.name}</p>
            {/* if not logged in, or if logged in as someone other than the blog's author,
            show only 'hello', otherwise show the delete button */}
            {!window.localStorage.getItem("loggedUser") ||
            JSON.parse(window.localStorage.getItem("loggedUser")).username ===
              blog.user.username ? (
              <Button color="error" onClick={deleteThisBlog}>
                delete
              </Button>
            ) : (
              "hello"
            )}
          </div>
        </div>
      ) : (
        <div>
          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            onClick={toggleExpanded}
          >
            {blog.title}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blog;
