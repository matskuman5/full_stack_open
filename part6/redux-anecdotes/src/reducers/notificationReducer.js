import { createSlice } from "@reduxjs/toolkit"

const initialState = 'hello'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        show(state, action) {
            return action.payload
        },
        hide(state, action) {
            console.log(action.payload)
            return ''
        }
    }
})

export const { show, hide } = notificationSlice.actions
export default notificationSlice.reducer