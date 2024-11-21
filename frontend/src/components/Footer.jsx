import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
   <footer className=" py-6">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <Link to="/AboutUs" className="text-gray-600 hover:text-gray-900">About Us</Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Sign up for our newsletter:</p>
              <input type="email" placeholder="Enter your email" className="mt-2 px-4 py-2 border rounded" />
            </div>
            <div className="flex justify-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900"><i className="fab fa-facebook-f"></i></Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900"><i className="fab fa-twitter"></i></Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900"><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
        </footer>
     
   </>
  )
}

export default Footer
