import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
    document.getElementById('root')
)
// import Home from './components/Home.jsx'
// import Navbar from './components/Navbar.jsx'
// import CropReco from './components/CropReco.jsx'
// import Randomimg from './components/Randomimg.jsx'
// import {createBrowserRouter , RouterProvider} from 'react-router-dom'
// import Weather from './components/Weather.jsx'
// import Prediction from './components/Prediction.jsx'
// import Footer from './components/Footer.jsx'

// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<><Navbar /><Home/> </>,
//   },
//   {
//     path:'/randomimg',
//     element:<><Navbar /><Randomimg/></>,
//   },
//   {
//     path:'/CropReco',
//     element:<><Navbar /><CropReco/></>,
//   },
//   {
//     path:'/Weather',
//     element:<><Navbar/> <Weather/></>,
//   },
//   {
//     path:'/Prediction',
//     element:<><Navbar/> <Prediction/></>,
//   }
// ])

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App /> */}
//     <RouterProvider router={router} />
//   </StrictMode>,
// )
