import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

describe("callback function", () => {
  test("is called with correct info when create button is pressed", async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn((e) => e.preventDefault());

    const { container } = render(<NewBlogForm handleSubmit={createBlog} />);

    const titleInput = container.querySelector("#title-input");
    const urlInput = container.querySelector("#url-input");
    const createButton = screen.getByText("create");

    await user.type(titleInput, "test blog");
    await user.type(urlInput, "http something");
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);

    screen.findByText("test blog");
    screen.findByText("http something");
  });
});
