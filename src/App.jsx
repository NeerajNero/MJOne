import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './components/homePage'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import ProductPage from './components/productPage'
import 'bootstrap/dist/js/bootstrap.js'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/cart'
import ProductDetails from './components/productDetails'
import Wishlist from './components/wishlist'
import UserProfile from './components/userProfile'
import CheckoutPage from './components/checkoutPage'

function App() {

  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/productDetails' element={<ProductDetails />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/userProfile' element={<UserProfile/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
        </Routes>
        <ToastContainer 
         autoClose={1000}
         position="top-center" 
         hideProgressBar={false} 
         newestOnTop={true} 
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHove
        />
    </Router>
  )
}

export default App
