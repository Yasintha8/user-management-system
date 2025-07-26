import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home';
import Adduser from './components/adduser';
import UserDetails from './components/userDetails';
import Navbar from './components/navbar';
import { Toaster } from 'react-hot-toast';
import UpdateUser from './components/updateUser';
import Contact from './components/contact';
import SendPDF from './components/sendPDF';
import Gallery from './components/gallery';
import AuthPage from './components/authPage';
import ProtectedRoute from './components/protectedRoute';

function App() {

  const location = useLocation();
  const showNavbar = location.pathname !== "/";
  
  return (
    <div>
      {showNavbar && <Navbar />}
      <Toaster position="top-center" />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><Adduser /></ProtectedRoute>} />
        <Route path="/user-details" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
        <Route path="/update-user/:id" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/send-pdf" element={<ProtectedRoute><SendPDF /></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
