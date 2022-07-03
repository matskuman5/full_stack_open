import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

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
        dispatch(show(message))
        setTimeout(() => {
            dispatch(hide(''))
        }, lengthInSeconds * 1000)
    }
}

export const { show, hide } = notificationSlice.actions
export default notificationSlice.reducer