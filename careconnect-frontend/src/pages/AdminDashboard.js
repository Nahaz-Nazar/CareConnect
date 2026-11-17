
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.auth.adminToken);

  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    pending: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        // Dashboard summary API must be implemented in backend.
        const response = await api.get('/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });

        setStats({
          patients: response.data.totalPatients ?? 0,
          doctors: response.data.totalDoctors ?? 0,
          appointments: response.data.totalAppointments ?? 0,
          pending: response.data.pendingAppointments ?? 0
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Dashboard API is not available yet. Backend endpoint needs to be created.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [adminToken, navigate]);

  if (loading) {
    return <div className="container py-5">Loading dashboard...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">CareConnect Admin Dashboard</h2>

      {error && (
        <div className="alert alert-warning">{error}</div>
      )}

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Total Patients</h5>
            <h2>{stats.patients}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Total Doctors</h5>
            <h2>{stats.doctors}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Total Appointments</h5>
            <h2>{stats.appointments}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Pending Appointments</h5>
            <h2>{stats.pending}</h2>
          </div>
        </div>
      </div>

      <div className="card shadow mt-4 p-4">
        <h4>Admin Management</h4>
        <p>Manage patients, doctors and appointments from this dashboard.</p>

        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-primary" onClick={() => navigate('/admin/patients')}>
            Manage Patients
          </button>

          <button className="btn btn-primary" onClick={() => navigate('/admin/doctors')}>
            Manage Doctors
          </button>

          <button className="btn btn-primary" onClick={() => navigate('/admin/appointments')}>
            Manage Appointments
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
