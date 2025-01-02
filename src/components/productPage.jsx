import React, { useState } from 'react';
import { getProducts } from '../features/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addToCart, getCart } from '../features/cartSlice';
import Navbar from './navBar';
import Footer from './footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addToWishlist } from '../features/wishlistSlice';

const ProductPage = () => {
  const location = useLocation()
  const [searchedQuery, setSearchedQuery] = useState("")
  const [rangePrice, setRangePrice] = useState()
  const [products, setProducts] = useState([])
  const [category,setCategory] = useState([])
  const [rating, setRating] = useState()
  const [sortBy, setSortBy] = useState()
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartData = useSelector((state) => state.cart.cart)
  const productsData = useSelector((state) => state.products)
  const productsfromState = productsData?.products || null

  useEffect(() => {   
    if(productsfromState.length === 0){
      dispatch(getProducts())
    }
    if(productsfromState.length > 0){
      setProducts(productsfromState)
    }
},[dispatch])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search')?.toLowerCase() || '';
    if(searchQuery){
      setSearchedQuery(searchQuery)
    }
  },[location.search])

  useEffect(() => {
    dispatch(getCart())
  },[dispatch])

  useEffect(() => {
      filteredProductsData()
  },[rangePrice,category,rating,sortBy,searchedQuery])
  const filteredProductsData = () => {
      let filteredData = [...productsfromState]

      if(rangePrice){
        filteredData = filteredData.filter((product) => product.price < rangePrice)
      }
      
      if(category.length > 0){
        filteredData = filteredData.filter((product) => category.includes(product.category)) 
      }
      
      if(rating){
        filteredData = filteredData.filter((product) => product.rating >= rating) 
      }
      if(sortBy){
        filteredData = sortBy === "lowToHigh" ? filteredData.sort((a,b) => a.price - b.price) : sortBy === "highToLow" ? filteredData.sort((a,b) => b.price - a.price) : filteredData
      }
      if(searchedQuery){
        filteredData = filteredData.filter((product) => product.productName.toLowerCase().includes(searchedQuery))
      }
      
      setProducts(filteredData)
  }

  const handleCategory = (e) => {
      if(e.target.checked){
          setCategory((prevValue) => [...prevValue, e.target.value])
      }else{
          setCategory((prevValue) => prevValue.filter((cat) => cat !== e.target.value))
      }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setProducts(productsfromState);
    setRangePrice(5000)
    setCategory([])
    setRating()
    setSortBy()
    setSearchedQuery("")
  }
  const handleAddToCart = (e,product,productName) => {
    e.preventDefault();
    const quantity = 1
    dispatch(addToCart({product, quantity})).unwrap().then(() => toast.success("item added to cart"))
    setCartItems((prevValue) => [...prevValue, productName])
  }
  useEffect(() => {
    if(cartData.length > 0 && cartItems.length === 0){
      cartData.map((cart) => setCartItems((prevValue) => [...prevValue, cart.product.productName]))
    }
  },[cartData])

  useEffect(() => {
    setProducts(productsfromState)
  },[productsfromState])

  const handleGoToCart = (e) => {
    e.preventDefault()
    navigate('/cart')
  } 
  const handleAddToWishlist = (e,productId) => {
    e.preventDefault()
    dispatch(addToWishlist({productId})).unwrap().then(() => toast.success("item added to wishlist")).catch(() => toast.error("Item already in wishlist"))
  } 
  return (
    <>
    <Navbar />
    <div className="container my-4">
      <div className="row">
        {/* Filters Section */}
        <div className="col-md-2 mb-4">
            <div className='d-flex justify-content-between'>
            <h5>Filters</h5>
            <button className="btn btn-link text-decoration-none p-0 mb-3" onClick={handleClear}>Clear</button> 
            </div>
          
          <div className="mb-3">
            <label className="form-label">Price: </label> {rangePrice}<br />
            <input type="range" className="form-range" min="100" max="5000" value={rangePrice} style={{width: "180px"}} onChange={(e) => setRangePrice(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <div>
              <input type="checkbox" id="men" value="Men" checked={category.includes("Men")} onChange={(e) => handleCategory(e)}/>
              <label htmlFor="men" className="ms-2">Men Clothing</label><br/>
              <input type="checkbox" id="men" value="Women" checked={category.includes("Women")} onChange={(e) => handleCategory(e)}/> 
              <label htmlFor="men" className="ms-2">Women Clothing</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            {[4, 3, 2, 1].map((ratingValue) => (
              <div key={ratingValue}>
                <input type="radio" name="rating" id={`rating${ratingValue}`} value={ratingValue} checked={rating == ratingValue} onChange={(e) => setRating(e.target.value)}/>
                <label htmlFor={`rating${ratingValue}`} className="ms-2">{ratingValue} Stars & Above</label>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label">Sort by</label>
            <div>
              <input type="radio" name="sortBy" id="lowToHigh" checked={sortBy === "lowToHigh"}  value="lowToHigh" onChange={(e) => setSortBy(e.target.value)}/>
              <label htmlFor="lowToHigh" className="ms-2">Price - Low to High</label>
            </div>
            <div>
              <input type="radio" name="sortBy" id="highToLow" checked={sortBy === "highToLow"} value="highToLow" onChange={(e) => setSortBy(e.target.value)}/>
              <label htmlFor="highToLow" className="ms-2">Price - High to Low</label>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="col-md-10">
          {productsData.status === "successfull" && <h5>Showing All Products</h5>}
          {productsData.status === "loading" && <h5>Loading....</h5>}
          {productsData.status === "failed" && <h5>no data found</h5>}
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-6 col-md-3 mb-4">
                <div className="card" style={{height: "400px"}}>
                  <Link to='/productDetails' state={product}><img src={product.productImage} alt={product.productName} className="card-img-top" style={{height: "240px"}}/></Link>
                  <div className="card-body text-center">
                    <h6 className="card-title">{product.productName}</h6>
                    <div className='d-flex justify-content-between'>
                    <p>Rating: {product.rating}</p>
                    <p>Price: {product.price}</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                    <button className={`btn btn-sm me-2 ${cartItems.includes(product.productName) ? "btn-success" : "btn-primary"}`} style={{width: "100%"}} onClick={cartItems.includes(product.productName) ? handleGoToCart : (e) => handleAddToCart(e,product._id,product.productName)}>{cartItems.includes(product.productName) ? "Go to Cart" : "Add to Cart"}</button>
                    <button className="btn btn-outline-secondary btn-sm" style={{width: "100%"}} onClick={(e) => handleAddToWishlist(e, product._id)}>Add to Wishlist</button>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};


export default ProductPage;
