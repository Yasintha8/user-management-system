import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Adduser from './components/adduser'
import UserDetails  from './components/userDetails'
import Navbar from './components/navbar'
import { Toaster } from 'react-hot-toast';
import UpdateUser from './components/updateUser'
import Register from './components/register'
import Login from './components/login'
import Contact from './components/contact'
import SendPDF from './components/sendPDF'

function App() {

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} /> //default when page load
        <Route path="/add-user" element={<Adduser />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/send-pdf' element={<SendPDF />} />
      </Routes>
    </div>
  )
}

export default App
