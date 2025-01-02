import Footer from "./footer"
import Navbar from "./navBar"
import { getCart, deleteItemFromCart, increaseQuantity, decreaseQuantity, moveToWishlist } from "../features/cartSlice"
import { totalPrice } from "../features/cartSlice"
import { useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
const Cart = () => {
    const cartData = useSelector((state) => state.cart.cart)
    const cartPrice = useSelector((state) => state.cart.totalPrice)
    const dispatch = useDispatch()
    useEffect(() => {
      if(cartData.length === 0){
        dispatch(getCart())
      }
    },[cartData.length])
    const handleRemove = (e, id) => {
      e.preventDefault()
      dispatch(deleteItemFromCart({id})).unwrap().then(() => toast.success("Item removed successfully"))
    }
    useEffect(() => {
      dispatch(totalPrice())
    },[cartPrice,cartData])

    const handleIncreaseQuantity = (e, productId) => {
      e.preventDefault()
      console.log(productId)
      dispatch(increaseQuantity({productId})).unwrap().then(() => toast.success("update success"))
    }

    const handleDecreaseQuantity = (e,productId) => {
      e.preventDefault()
      dispatch(decreaseQuantity({productId})).unwrap().then(() => toast.success("update success"))
    }

    const handleMoveToWishlist = (e,productIdofProduct,productIdofCartItem) => {
      e.preventDefault()
      dispatch(moveToWishlist({productIdofProduct,productIdofCartItem})).unwrap().then(() => toast.success("Item moved to Wishlist successfully"))
    }
    console.log(cartData)

    return (
        <>
            <Navbar />
            <main className="container">
                <div className="container my-5">
        <h2 className="mb-4 text-center">MY CART ({`${cartData.length}`})</h2>
        <div className="row">
          <div className="col-md-6">
            {cartData.length > 0 ? cartData.map((cart) => (<div key={cart._id} className="card mb-3">
              <div className="row g-0" style={{width: "100%"}}>
                <div className="col-md-4">
                  <img
                    src={cart.product.productImage}
                    className="img-fluid rounded-start"
                    alt="Product"
                  style={{height: "100%", width: "100%"}}/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{cart.product.productName}</h5>
                    <p className="card-text">
                      <span className="text-success">&#8377;{cart.product.price}</span>{" "}<br/>
                      <span className={cart.product.rating <= 2 ? "text-danger" : "text-success"}>Rating: {cart.product.rating}</span>
                    </p>
                    <div className="d-flex align-items-center mb-3">
                      <span>Quantity: </span>
                      <button className="btn btn-outline-secondary mx-2" onClick={(e) => handleDecreaseQuantity(e,cart._id)}>-</button>
                      <span>{cart.quantity}</span>
                      <button className="btn btn-outline-secondary mx-2" onClick={(e) => handleIncreaseQuantity(e,cart._id)}>+</button>
                    </div>
                    <button className="btn btn-danger" style={{width: "60%"}} onClick={(e) => handleRemove(e,cart._id)}>Remove From Cart</button>
                    <button className="btn btn-outline-secondary mt-2" style={{width: "60%"}} onClick={(e) => handleMoveToWishlist(e,cart.product._id,cart._id)}>Move to Wishlist</button>
                  </div>
                </div>
              </div>
            </div>)) : <p className="text-center">No Items in Cart</p>}
          </div>

          <div className="col-md-4" style={{display: cartData.length === 0 ? "none": ""}}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">PRICE DETAILS</h5>
                <hr />
                <p className="card-text">
                  Price ({`${cartData.length} ${cartData.length > 1 ? "Items" : "Item"}`}): <span className="float-end">&#8377;{cartPrice}</span>
                </p>
                <p className="card-text">
                  Discount: <span className="float-end">- &#8377;0</span>
                </p>
                <p className="card-text">
                  Delivery Charges: <span className="float-end">&#8377;499</span>
                </p>
                <hr />
                <h5 className="card-text">
                  TOTAL AMOUNT: <span className="float-end">&#8377;{cartPrice + 499}</span>
                </h5>
                <p className="text-success mt-2">You will save &#8377;0 on this order</p>
                <Link className="btn btn-primary w-100" to='/checkout' state={cartData}>PLACE ORDER</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
            </main>
            <Footer />
        </>
    )
}
export default Cart