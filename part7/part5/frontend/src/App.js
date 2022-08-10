import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { newNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      dispatch(setBlogs(sortedBlogs));
    });
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("attempting login as", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");

      dispatch(newNotification("logged in"));
    } catch (exception) {
      dispatch(newNotification(`error: ${exception.response.data.error}`));
      console.error(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(newNotification("logged out"));
  };

  const blogFormRef = useRef();

  const getNewBlogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
    const showWhenVisible = { display: newBlogVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id="new-blog-button" onClick={() => setNewBlogVisible(true)}>
            new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm handleSubmit={createBlog} ref={blogFormRef} />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = {
        title: blogFormRef.current.title,
        author: blogFormRef.current.author,
        url: blogFormRef.current.url,
      };
      await blogService.createNew(blog);
      setNewBlogVisible(false);
      dispatch(newNotification(`created new blog ${blog.title}`));
    } catch (exception) {
      dispatch(newNotification(`error: ${exception.response.data.error}`));
      console.error(exception);
    }
  };

  return (
    <Container>
      <div>
        <Notification />
        {user === null ? (
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                  id="username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  name="username"
                />
              </div>
              <div>
                password
                <input
                  id="password"
                  type={password}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  name="password"
                />
              </div>
              <button id="login-button" type="submit">
                login
              </button>
            </form>
          </div>
        ) : (
          <div>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
            {getNewBlogForm()}
            <h2>blogs</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <Blog blog={blog} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Container>
  );
};

export default App;
