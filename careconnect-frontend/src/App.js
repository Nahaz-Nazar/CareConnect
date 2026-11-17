
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/appointments/book" element={<BookAppointment />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
