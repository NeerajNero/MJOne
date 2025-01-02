import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Navbar from './navBar';
import Footer from './footer';

const HomePage = () => {
  const categories = [
    { name: 'Men', image: 'https://placehold.co/600x400?text=Men' },
    { name: 'Women', image: 'https://placehold.co/600x400?text=Women' },
    { name: 'Kids', image: 'https://placehold.co/600x400?text=Kids' },
    { name: 'Electronics', image: 'https://placehold.co/600x400?text=All' }
  ];

  return (
    <>
    <Navbar />
    <div className="container my-4">
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-5 col-md-3 mb-3">
            <Link to="/products" className="text-decoration-none text-dark">
              <div className="card">
                <img src={category.image} alt={category.name} className="card-img-top" id='homePageImg'/>
                <div className="card-body text-center" id='homePage'>
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='bg-light min-vh-40' style={{height: "500px"}}>
        
      </div>
      <div className="mt-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="p-3 bg-light text-center">
              <h4>New Arrivals</h4>
              <p>Summer Collection: Check out our best winter collection to stay warm in style this season.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="p-3 bg-light text-center">
              <h4>New Arrivals</h4>
              <p>Summer Collection: Check out our best winter collection to stay warm in style this season.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default HomePage;
