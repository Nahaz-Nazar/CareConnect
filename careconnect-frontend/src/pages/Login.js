
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../api/axios';
import { loginSuccess } from '../features/auth/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const response = await api.post('/login', {
        email,
        password
      });

      dispatch(loginSuccess({
        user: response.data.user,
        token: response.data.token
      }));

      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow-lg p-4 p-md-5">

            <div className="text-center mb-4">
              <div className="feature-icon mx-auto">✚</div>
              <h2 className="section-title">Welcome Back</h2>
              <p className="text-secondary">
                Login to your CareConnect patient account.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              Don't have an account?{' '}
              <Link to="/register" className="fw-bold text-primary">
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
