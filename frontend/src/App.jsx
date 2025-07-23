import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Adduser from './components/adduser'
import UserDetails  from './components/userDetails'
import Navbar from './components/navbar'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} /> //default when page load
        <Route path="/mainhome" element={<Home />} />
        <Route path="/add-user" element={<Adduser />} />
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
    </div>
  )
}

export default App
