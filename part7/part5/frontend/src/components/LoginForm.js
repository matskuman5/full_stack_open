import { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setUser } from "../reducers/userReducer";
import { newNotification } from "../reducers/notificationReducer";
import { TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username:"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username"
          />
        </div>
        <div>
          <TextField
            label="Password"
            id="password"
            type={password}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="password"
          />
        </div>
        <Button variant="outlined" id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
