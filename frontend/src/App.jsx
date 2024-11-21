import Home from './components/Home'
import { Route , Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CropReco from './components/CropReco'
import Weather from './components/Weather'
import Prediction from './components/Prediction'

function App() {
  


  return (
    <>
    <Navbar />
    <Routes>
      <Route index element={<Home />} />
      <Route path='/CropReco' element={<CropReco/>} />
      <Route path='/Weather' element={<Weather/>} />
      <Route path='/Prediction' element={<Prediction/>} />
    </Routes>
    <Footer/>
    
    </>
  )
}

export default App
