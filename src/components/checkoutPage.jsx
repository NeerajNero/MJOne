import Footer from "./footer"
import Navbar from "./navBar"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import {useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {getAddress} from '../features/addressSlice'
const CheckoutPage = () => {
    const [order, setOrder] = useState(false)
    const [termsAndConditions, setTermsAndConditions] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState()
    const location = useLocation()
    const dispatch = useDispatch()
    const products = location?.state
    const userAddress = useSelector((state) => state?.address?.address)
    useEffect(() => {
        if(userAddress.length === 0){
            dispatch(getAddress())
        }
    },[])
    const handlePlaceOrder = (e) => {
        e.preventDefault()
        setOrder(true)
    }
    const handleTerms = (e) => {
        e.preventDefault()
        if(e.target.checked){
            setTermsAndConditions(true)
        }
    }
    const handleSelectedAddress = (e,address) => {
        e.preventDefault()
        if(e.target.checked){
            setSelectedAddress(address)
        }
    }
    return(
        <>
        <Navbar />
        <main className="container my-3">
            {order ? <div className="text-center"><h1>Order Placed successfully Thanks for Shopping</h1><Link to="/products">Explore more poroducts</Link></div>: <div className="row">
                <div className="col-md-8">
                    <div className="list-group"> 
                    {products. length > 0 ?  products.map((product,i) => (<div key={i}><div className="list-group-item"><p>Product : {product.product.productName} <strong>X {product.quantity} </strong></p> <p>Price: <strong>{product.product.price * product.quantity}</strong></p> </div>
                    </div>)) : <p>No item Selected</p>}
                    </div>
                    <h3 className="mt-3">Select Address: </h3>
                        <div className="list-group my-3">
                            {userAddress.length > 0 ? userAddress.map((address,i) => (<div key={i} className="list-group-item"><input type="radio" name="address" onChange={() => setSelectedAddress(address)}/> {address.street}, {address.building}, {address.landmark}, {address.city}, {address.state}, {address.pincode}</div>)) : ""}
                        </div>
                        <div><input type="checkbox" required onClick={() => setTermsAndConditions(!termsAndConditions)}/> I agree to all Terms and Conditions</div>
                </div>
                <div className="col-md-4">
                    <div className="card"><div className="card-body">
                    <h3>Price</h3>
                        <hr/>
                        <p>Product: ({products.length}) {products.length > 1 ? "Items": "Item"} : Rs. {products.reduce((acc,curr) => acc += curr.product.price * curr.quantity,0)}</p>
                        <p>Delivery Fee: Rs. 499</p>
                        <hr/>
                        <p>Total Price: Rs. <strong>{products.reduce((acc,curr) => acc += curr.product.price * curr.quantity,0) + 499}</strong></p>
                        </div></div>
                        
                    </div>
                    < button onClick={(e) => {if(selectedAddress && termsAndConditions){handlePlaceOrder(e)}}} className="btn btn-success my-3" style={{width: "20%"}}>Place Order</button>

            </div>}
            
        </main>

        <Footer />
        </>
    )
}
export default CheckoutPage