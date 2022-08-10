import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const NewBlogForm = forwardRef((props, ref) => {
  NewBlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useImperativeHandle(ref, () => {
    return {
      title,
      author,
      url,
    };
  });

  return (
    <div>
      <h2>create new blog</h2>

      <form onSubmit={props.handleSubmit}>
        <div>
          <TextField
            label="Title:"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          <TextField
            label="Author:"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          <TextField
            label="URL:"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>
        <Button variant="outlined" id="submit-button" type="submit">
          create
        </Button>
      </form>
    </div>
  );
});

NewBlogForm.displayName = "NewBlogForm";

export default NewBlogForm;
