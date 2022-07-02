import { createSlice } from "@reduxjs/toolkit"

const initialState = 'hello'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        testShit(state, action) {
            return state
        }
    }
})

export default notificationSlice.reducer