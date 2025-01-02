import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/productSlice'
import cartReducer from '../features/cartSlice'
import wishlistReducer from '../features/wishlistSlice'
import userReducer from '../features/userSlice'
import addressReducer from '../features/addressSlice'

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: userReducer,
        address: addressReducer
    }
})

export default store