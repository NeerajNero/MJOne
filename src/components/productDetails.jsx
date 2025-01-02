import Footer from "./footer"
import Navbar from "./navBar"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { addToCart } from "../features/cartSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
const ProductDetails = () => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const location = useLocation()
    const product = location?.state
    const products = [{
      product: product,
      quantity: quantity
    }]
    const incrementQuantity = (e) => {
      e.preventDefault()
      setQuantity((prevValue) => prevValue + 1)
    }
    const decrementQuantity = (e) => {
      e.preventDefault()
      if(quantity > 1){
        setQuantity((prevValue) => prevValue - 1)
      }
      
    }
    const handleAddToCart = (e) => {
      e.preventDefault()
      dispatch(addToCart({product: product._id,quantity})).unwrap().then(() => toast.success("Item added to cart")).catch(() => toast.error("unable to add item to cart"))
    }
    return(
        <>
        <Navbar />
        <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <img style={{height: "78%"}}
              src={product.productImage}
              className="img-fluid"
              alt="Product"
            />
            <div className="d-flex flex-column">
            <Link to='/checkout' state={products} className="btn btn-primary my-2">Buy Now</Link>
            <button className="btn btn-outline-secondary my-2" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            
          </div>
          <div className="col-md-6">
            <h2>{product.productName}</h2>
            <p>
              <span className="text-success fs-5"><strong>Price: </strong>&#8377;{product.price}</span>{" "}<br />
              <span className={product.rating <= 2 ? "text-danger fs-5" : "text-success fs-5"}>Rating: {product.rating}</span>
            </p>
            <div className="d-flex align-items-center mb-3">
              <span>Quantity: </span>
              <button className="btn btn-outline-secondary mx-2" onClick={decrementQuantity}>-</button>
              <span>{quantity}</span>
              <button className="btn btn-outline-secondary mx-2" onClick={incrementQuantity}>+</button>
            </div>

            <h5 className="mt-4">Description:</h5>
            <p>{product.description}</p>
            <hr/>
            <p><strong>Seller Information</strong></p>
            <p>"Welcome to JohnCloths! We take pride in offering a carefully curated collection of stylish and high-quality clothing for every occasion. Whether you're looking for casual wear, work attire, or outfits for special events, our selection is designed to help you look and feel your best. Each piece is chosen with attention to detail, ensuring comfort, durability, and the latest trends. Customer satisfaction is our top priority, and we're here to provide you with exceptional service and a seamless shopping experience. Thank you for choosing John—where fashion meets quality!"</p>
          </div>
        </div>
        <h4 className="mt-5">More items you may like:</h4>
        <div className="d-flex">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div className="card me-3" key={index} style={{ width: "18rem" }}>
                <img
                  src="https://via.placeholder.com/150"
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Men Premium Jacket</h5>
                  <p className="card-text">&#8377;2000</p>
                  <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
              </div>
            ))}
        </div>
      </div>
        <Footer />
        </>
    )
}
export default ProductDetails