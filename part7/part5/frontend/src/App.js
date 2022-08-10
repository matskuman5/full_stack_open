import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";

import blogService from "./services/blogs";
import { newNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Button, Toolbar } from "@mui/material";

const App = () => {
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

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
          <Button
            variant="outlined"
            id="new-blog-button"
            onClick={() => setNewBlogVisible(true)}
          >
            new blog
          </Button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm handleSubmit={createBlog} ref={blogFormRef} />
          <Button
            variant="outlined"
            color="error"
            onClick={() => setNewBlogVisible(false)}
          >
            cancel
          </Button>
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
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Router>
            <AppBar position="sticky">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  home
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                Logged in as {user.name}
                <Button color="inherit" onClick={handleLogout}>
                  logout
                </Button>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <div>
                      {getNewBlogForm()}
                      <BlogList />
                    </div>
                  </div>
                }
              />
              <Route
                path="/users"
                element={
                  <div>
                    <Users />
                  </div>
                }
              />
            </Routes>
          </Router>
        </div>
      )}
    </Container>
  );
};

export default App;
