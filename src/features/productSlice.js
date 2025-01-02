import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products: [],
    status: 'idle',
    error: null
}

export const getProducts = createAsyncThunk('getProducts', async() => {
    const response = await axios.get('https://mj-one-backend.vercel.app/product/products')
    return response.data
})

const productSlice = createSlice({
    name: 'PRODUCTS',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getProducts.fulfilled, (state,action) => {
            state.status= "successfull"
            state.products = action.payload.products
        })
        .addCase(getProducts.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer