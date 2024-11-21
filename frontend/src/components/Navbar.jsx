import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div>
        <header className="shadow-current shadow-green-600 shadow-lg mb-4">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="max-sm:hidden text-2xl font-bold">
              <i className=" text-nowrap fas fa-seedling"></i> Agri Farm
            </div>
            <nav className="space-x-4">
              <Link to="/" className="text-gray-900 hover:text-black hover:font-bold">Home</Link>
              <Link to="/Weather" className="text-gray-900 hover:text-black hover:font-bold">Weather</Link>
              <Link to="/CropReco" className="text-gray-900 hover:text-black hover:font-bold  text-nowrap">Crop Recommendations</Link>
              <Link to="/Prediction" className="text-gray-900 hover:text-black hover:font-bold  text-nowrap">Pest Detection</Link>
              <Link to="/AboutUs" className="text-gray-900 hover:text-black hover:font-bold  text-nowrap">About Us</Link>
            </nav>
            <button className="bg-blue-500 text-white px-4 py-2 rounded max-md:hidden ">Get </button>
          </div>
        </header>
      </div>


    </>
  )
}

export default Navbar
