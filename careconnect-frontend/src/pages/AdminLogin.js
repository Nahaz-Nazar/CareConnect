
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { adminLoginSuccess } from '../features/auth/authSlice';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const response = await api.post('/admin/login', {
        email: email.trim(),
        password
      });

      if (response.data.user?.role !== 'ADMIN') {
        setError('Admin access denied');
        return;
      }

      dispatch(adminLoginSuccess({
        user: response.data.user,
        token: response.data.token
      }));

      window.location.href = 'http://localhost:8080/';

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid admin email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Admin Login</h2>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Admin Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Admin Login'}
              </button>
            </form>

            <p className="text-center mt-3">
              <Link to="/">Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
