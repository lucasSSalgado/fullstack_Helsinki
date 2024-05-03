import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return action.payload
        },
    }
})

export const { notify, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer