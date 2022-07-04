import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
let timeoutId

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

export const setNotification = (message, lengthInSeconds) => {
    return async dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(show(message))
        timeoutId = setTimeout(() => {
            dispatch(hide(''))
        }, lengthInSeconds * 1000)
    }
}

export const { show, hide } = notificationSlice.actions
export default notificationSlice.reducer