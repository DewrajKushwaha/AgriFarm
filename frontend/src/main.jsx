import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/home'
import Navbar from './components/Navbar.jsx'
import CropReco from './components/CropReco.jsx'
import Randomimg from './components/Randomimg.jsx'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'


const router=createBrowserRouter([
  {
    path:'/',
    element:<><Navbar /><Home/></>,
  },
  {
    path:'/randomimg',
    element:<><Navbar /><Randomimg/></>,
  },
  {
    path:'/CropReco',
    element:<><Navbar /><CropReco/></>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
