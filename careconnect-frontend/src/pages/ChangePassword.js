
import React, { useState } from 'react';
import api from '../api/axios';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('danger');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must contain at least 8 characters');
      setMessageType('danger');
      return;
    }

    try {
      const response = await api.put('/change-password', {
        currentPassword,
        newPassword
      });

      setMessage(
        response.data.message || 'Password changed successfully'
      );
      setMessageType('success');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Password change failed'
      );
      setMessageType('danger');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-primary mb-4">Change Password</h2>

      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="form-label">Current Password</label>
        <input
          className="form-control mb-3"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label className="form-label">New Password</label>
        <input
          className="form-control mb-3"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength="8"
          required
        />

        <label className="form-label">Confirm New Password</label>
        <input
          className="form-control mb-3"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength="8"
          required
        />

        <button type="submit" className="btn btn-primary w-100">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
