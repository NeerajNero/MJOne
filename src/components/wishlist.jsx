import Footer from "./footer"
import Navbar from "./navBar"
import { getWishlist, removeFromWishlist, moveToCart } from "../features/wishlistSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"

const Wishlist = () => {
  const wishlistData = useSelector((state) => state?.wishlist?.wishlist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWishlist())
  },[dispatch])
  
  const handleRemove = (e,productId) => {
    e.preventDefault()
    dispatch(removeFromWishlist({productId})).unwrap().then(() => toast.success("Item removed successfully"))
  }
  const handleMoveToCart = (e,productIdofWishlistItem,productIdofProduct) => {
    e.preventDefault()
    dispatch(moveToCart({productIdofProduct,productIdofWishlistItem})).unwrap().then(() => toast.success("Item Moved to cart successfully"))
  }
    return(
        <>
        <Navbar />
        <div className="container my-5">
        <h2 className="mb-4 text-center">My Wishlist ({wishlistData.length})</h2>
        <div className="d-flex row">
          {wishlistData.map((item, index) => (
            <div className="col-md-3 mt-3" key={index}>
            <div className="card me-3"  style={{ width: "16rem" }}>
              <img src={item.product.productImage} className="card-img-top" alt={item.title} style={{height: "280px", width: "100%"}}/>
              <div className="card-body">
                <h5 className="card-title">{item.product.productName}</h5>
                <p className="card-text">&#8377;{item.product.price}</p>
                <button className="btn btn-outline-primary w-100" onClick={(e) => handleMoveToCart(e,item._id,item.product._id)}>
                  Move to Cart
                </button>
                <button className="btn btn-outline-danger w-100 mt-2" onClick={(e) => handleRemove(e,item._id)}>
                  Remove
                </button>
              </div>
            </div>
            </div>
          ))}
        </div>
        </div>
        <Footer />
        </>
    )
}
export default Wishlist