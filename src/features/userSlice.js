import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    user: [],
    status: "idle",
    error: null
}
export const getUser = createAsyncThunk('getUser', async() => {
    const response = await axios.get('http://localhost:3000/user/getUser')
    return response.data
})
const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUser.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getUser.fulfilled, (state,action) => {
            state.status = "success"
            state.user = action.payload.user
        })
        .addCase(getUser.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})
export default userSlice.reducer