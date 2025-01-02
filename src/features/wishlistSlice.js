import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { moveToCartAction } from "./cartSlice";
const initialState = {
    wishlist: [],
    status: "idle",
    error: null
}
export const addToWishlist = createAsyncThunk('addToWishlist', async({productId}) => {
    const response = await axios.post('http://localhost:3000/wishlist/addToWishlist', {productId})
    console.log(response.data)
    return response.data
})
export const getWishlist = createAsyncThunk('getwishlist', async() => {
    const response = await axios.get('http://localhost:3000/wishlist/wishlist')
    console.log(response.data)
    return response.data
})
export const removeFromWishlist = createAsyncThunk('removeFromWishlist', async({productId}) => {
    const response = await axios.delete(`http://localhost:3000/wishlist/deleteFromWishlist/${productId}`)
    return response.data
})
export const moveToCart = createAsyncThunk('moveToCart', async({productIdofProduct, productIdofWishlistItem}, {dispatch}) => {
    const response = await axios.post('http://localhost:3000/wishlist/moveToCart', {productIdofProduct,productIdofWishlistItem})
    console.log(response.data)
    dispatch(moveToCartAction({ product: response.data.product }));
    return response.data
})
const wishlistSlice = createSlice({
    name: 'WISHLIST',
    initialState,
    reducers: {
        moveToWishlistAction: (state,action) => {
            const {product} = action.payload
            const findProduct = state.wishlist.find((wishlistProduct) => wishlistProduct.product._id.toString() === product.product._id.toString())
            console.log(findProduct)
            if(!findProduct){
                state.wishlist.push(product)
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getWishlist.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getWishlist.fulfilled, (state,action) => {
            state.status = "success"
            state.wishlist = action.payload.wishlist
        })
        .addCase(getWishlist.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(addToWishlist.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addToWishlist.fulfilled, (state,action) => {
            state.status = "success"
            const productId = action.payload.wishlist._id
            const findProduct = state.wishlist.find((product) => product._id.toString() === productId.toString())
            if(findProduct){
                state.wishlist.push(findProduct)
            }
        })
        .addCase(addToWishlist.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(removeFromWishlist.pending, (state) => {
            state.status = "loading"
        })
        .addCase(removeFromWishlist.fulfilled, (state,action) => {
            state.status = "success"
            const productId = action.payload.productId
            const findProduct = state.wishlist.find((product) => product._id.toString() === productId.toString())
            if(findProduct){
                state.wishlist = state.wishlist.filter((product) => product._id.toString() !== productId.toString())
            }
        })
        .addCase(removeFromWishlist.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(moveToCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(moveToCart.fulfilled, (state,action) => {
            state.status = "success"
            state.wishlist = state.wishlist.filter((product) => product.product._id.toString() !== action.payload.product.product._id.toString())
        })
        .addCase(moveToCart.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default wishlistSlice.reducer
export const {moveToWishlistAction} = wishlistSlice.actions