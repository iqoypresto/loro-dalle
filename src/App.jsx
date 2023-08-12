import './App.css'
import { Home, Login, Register, RegisterSuccess, UserDashboard } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AOS from "aos";
import 'aos/dist/aos.css';

function App() {

  AOS.init();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register-success' element={<RegisterSuccess />} />
        <Route path='/dashboard' element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
