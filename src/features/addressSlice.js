import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    address: [],
    status: "idle",
    error: null
}

export const getAddress = createAsyncThunk('getAddress', async() => {
    const response = await axios.get('http://localhost:3000/address/getAddress')
    return response.data
})
export const deleteAddress = createAsyncThunk('deleteAddress', async({addressId}) => {
    const response = await axios.delete(`http://localhost:3000/address/deleteAddress/${addressId}`)
    return response.data
})
export const addAddress = createAsyncThunk('addAddress', async({street,building,landmark,state,city,pincode}) => {
    const response = await axios.post('http://localhost:3000/address/addAddress', {street,building,landmark,state,city,pincode})
    return response.data
})
export const updateAddress = createAsyncThunk('updateAddress', async({street,building,landmark,state,city,pincode,productId}) => {
    const response = await axios.put('http://localhost:3000/address/updateAddress', {street,building,landmark,state,city,pincode,productId})
    return response.data
})
const addressSlice = createSlice({
    name: "ADDRESS",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getAddress.fulfilled, (state,action) => {
            state.status = "success"
            state.address = action.payload.address
        })
        .addCase(getAddress.rejected, (state,action) => {
            state.status = "loading"
            state.error = action.error.message
        })
        builder
        .addCase(deleteAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(deleteAddress.fulfilled, (state,action) => {
            state.status = "success"
            state.address = state.address.filter((address) => address._id.toString() !== action.payload.addressId.toString())
        })
        .addCase(deleteAddress.rejected, (state,action) => {
            state.status = "loading"
            state.error = action.error.message
        })
        builder
        .addCase(addAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addAddress.fulfilled, (state,action) => {
            state.status = "success"
            state.address.push(action.payload.address)
        })
        .addCase(addAddress.rejected, (state,action) => {
            state.status = "loading"
            state.error = action.error.message
        })
        builder
        .addCase(updateAddress.pending, (state) => {
            state.status = "loading"
        })
        .addCase(updateAddress.fulfilled, (state,action) => {
            state.status = "success"
            const addressId = action.payload.address._id
            const findAddress = state.address.find((address) => address._id.toString() === addressId.toString())
            if(findAddress){
                findAddress.street = action.payload.address.street
                findAddress.building = action.payload.address.building
                findAddress.landmark = action.payload.address.landmark
                findAddress.state = action.payload.address.state
                findAddress.city = action.payload.address.city
                findAddress.pincode = action.payload.address.pincode
            }
        })
        .addCase(updateAddress.rejected, (state,action) => {
            state.status = "loading"
            state.error = action.error.message
        })

    }
})

export default addressSlice.reducer