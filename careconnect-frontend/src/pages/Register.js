
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must contain at least 8 characters');
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            setError('Phone number must contain exactly 10 digits');
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                'http://localhost:8080/api/register',
                {
                    user_name: formData.user_name.trim(),
                    email: formData.email.trim(),
                    dateOfBirth: formData.dateOfBirth,
                    gender: formData.gender,
                    address: formData.address.trim(),
                    phoneNumber: formData.phoneNumber,
                    password: formData.password
                }
            );

            setSuccess(
                response.data.message || 'Registration successful'
            );

            alert(response.data.message || 'Registration successful');

            navigate('/login');

        } catch (err) {
            const message =
                err.response?.data?.message ||
                'Registration failed. Please try again.';

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Patient Registration
                        </h2>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="user_name"
                                    className="form-control"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="form-control"
                                    value={formData.dateOfBirth}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    className="form-control"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="form-control"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength="8"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>

                        </form>

                        <p className="text-center mt-3">
                            Already registered? <Link to="/login">Login</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
