
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/appointments/my');

      const data = response.data;

      setAppointments(
        Array.isArray(data) ? data : data.appointments || []
      );
    } catch (err) {
      console.error('Appointments error:', err);
      setError(
        err.response?.data?.message ||
        'Unable to load appointments. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading appointments...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-primary mb-4">My Appointments</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button
            className="btn btn-outline-danger btn-sm ms-3"
            onClick={fetchAppointments}
          >
            Retry
          </button>
        </div>
      )}

      {!error && appointments.length === 0 && (
        <div className="alert alert-info">
          No appointments found.
        </div>
      )}

      {appointments.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id || index}>
                  <td>{appointment.id || index + 1}</td>
                  <td>
                    {appointment.doctor?.name ||
                      appointment.doctorName ||
                      'N/A'}
                  </td>
                  <td>
                    {appointment.appointmentDate ||
                      appointment.date ||
                      'N/A'}
                  </td>
                  <td>{appointment.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
