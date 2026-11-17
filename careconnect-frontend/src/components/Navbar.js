import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import api from '../api/axios';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ✚ CareConnect
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#careConnectNavbar"
          aria-controls="careConnectNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="careConnectNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center">

            <Link className="nav-link" to="/">
              Home
            </Link>

            <Link className="nav-link" to="/doctors">
              Doctors
            </Link>

            {token ? (
              <>
                <Link className="nav-link" to="/appointments">
                  My Appointments
                </Link>

                <Link className="nav-link" to="/profile">
                  My Profile
                </Link>

                <Link className="nav-link" to="/change-password">
                  Change Password
                </Link>

                <button
                  className="btn btn-light text-primary ms-lg-3 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>

                <Link className="nav-link" to="/admin/login">
                  Admin Login
                </Link>

                <Link
                  className="btn btn-light text-primary ms-lg-3 mt-2 mt-lg-0"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;