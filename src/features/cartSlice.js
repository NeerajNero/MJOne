import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { moveToWishlistAction } from "./wishlistSlice";
const initialState = {
    cart: [],
    totalPrice: 0,
    status: 'idle',
    error: null
}

export const addToCart = createAsyncThunk('AddToCart', async({product,quantity}) => {
    const response = await axios.post('https://mj-one-backend.vercel.app/cart/addToCart', {product,quantity})
    console.log(response.data)
    return response.data
})
export const getCart = createAsyncThunk('getCart', async() => {
    const response = await axios.get('https://mj-one-backend.vercel.app/cart/getCart')
    return response.data
})
export const deleteItemFromCart = createAsyncThunk('deleteItem', async({id}) => {
    const response = await axios.delete(`https://mj-one-backend.vercel.app/cart/delete/${id}`)
    return response.data
})
export const increaseQuantity = createAsyncThunk('incQuantity', async({productId}) => {
    const response = await axios.put('https://mj-one-backend.vercel.app/cart/increaseQuantity', {productId})
    return response.data
})
export const decreaseQuantity = createAsyncThunk('decreaseQuantity', async({productId}) => {
    const response = await axios.put('https://mj-one-backend.vercel.app/cart/decreaseQuantity', {productId})
    return response.data
})
export const moveToWishlist = createAsyncThunk('moveToWishlist', async({productIdofProduct,productIdofCartItem}, {dispatch}) => {
    const response = await axios.post('https://mj-one-backend.vercel.app/cart/moveToWishlist', {productIdofProduct, productIdofCartItem})
    console.log(response.data)
    dispatch(moveToWishlistAction({product: response.data.product}))
    return response.data
})
const cartSlice = createSlice({
    name: 'CART',
    initialState,
    reducers: {
        totalPrice: (state,action) => {
            state.totalPrice = state.cart.reduce((acc, curr) => {
                const price = curr.product?.price || 0; 
                const quantity = curr.quantity || 1; 
                return acc + price * quantity;
            },0)
        },
        moveToCartAction: (state,action) => {
            const {product} = action.payload
            console.log(product)
            const findProduct = state.cart.find((cartProduct) => cartProduct.product._id.toString() === product.product._id)
            if(findProduct){
                findProduct.quantity+= 1;
            }else{
                state.cart.push(product)
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addToCart.fulfilled, (state,action) => {
            state.status = "success"
            const productId = action.payload.cart.product._id
            const findProduct = state.cart.find((cartProduct) => productId.toString() === cartProduct.product._id.toString())
            if(!findProduct){
                state.cart.push(action.payload.cart)
            }else{
                findProduct.quantity+= action.payload.cart.quantity
            }
        })
        .addCase(addToCart.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(getCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getCart.fulfilled, (state,action) => {
            state.status = "success"
            state.cart = action.payload.cart
        })
        .addCase(getCart.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(deleteItemFromCart.pending, (state) => {
            state.status = "loading"
        })
        .addCase(deleteItemFromCart.fulfilled, (state,action) => {
            state.status = "success"
            state.cart = state.cart.filter((product) => product._id !== action.payload.id)
        })
        .addCase(deleteItemFromCart.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(increaseQuantity.pending, (state) => {
            state.status = "loading"
        })
        .addCase(increaseQuantity.fulfilled, (state,action) => {
            state.status = "success"
            const findProduct = state.cart.find((product) => product._id === action.payload.product._id)
            console.log(findProduct)
            if(findProduct){
                findProduct.quantity = findProduct.quantity + 1;
            }
        })
        .addCase(increaseQuantity.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(decreaseQuantity.pending, (state) => {
            state.status = "loading"
        })
        .addCase(decreaseQuantity.fulfilled, (state,action) => {
            state.status = "success"
            const findProduct = state.cart.find((product) => product._id === action.payload.product._id)
            console.log(findProduct)
            if(findProduct && findProduct.quantity > 1){
                findProduct.quantity = findProduct.quantity - 1;
            }else{
                state.cart = state.cart.filter((product) => product._id !== action.payload.product._id)
            }
            
        })
        .addCase(decreaseQuantity.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(moveToWishlist.pending, (state) => {
            state.status = "loading"
        })
        .addCase(moveToWishlist.fulfilled, (state,action) => {
            state.status = "success"
            const findProduct = state.cart.find((cartProduct) => cartProduct.product._id.toString() === action.payload.product.product._id.toString())
            if(findProduct){
                state.cart = state.cart.filter((product) => product.product._id.toString() !== action.payload.product.product._id.toString())
            }
        })
        .addCase(moveToWishlist.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default cartSlice.reducer
export const {totalPrice,moveToCartAction} = cartSlice.actions