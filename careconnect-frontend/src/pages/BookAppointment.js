
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

function BookAppointment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState(params.get('doctorId') || '');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        doctorId: Number(doctorId),
        appointmentDate,
        appointmentTime
      });
      alert('Appointment booked successfully');
      navigate('/appointments');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '550px' }}>
      <h2 className="text-primary mb-4">Book Appointment</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label className="form-label">Doctor ID</label>
        <input className="form-control mb-3" type="number" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
        <label className="form-label">Appointment Date</label>
        <input className="form-control mb-3" type="date" min={new Date().toISOString().split('T')[0]} value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        <label className="form-label">Appointment Time</label>
        <input className="form-control mb-3" type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
        <button className="btn btn-primary w-100">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;
