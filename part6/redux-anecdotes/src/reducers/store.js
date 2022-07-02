import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer
    }
})

export default store