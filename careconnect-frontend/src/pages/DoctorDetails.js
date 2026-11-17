
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/doctors/${id}`)
      .then((response) => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load doctor details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container py-5">Loading doctor details...</div>;
  }

  if (error || !doctor) {
    return <div className="container py-5 text-danger">{error || 'Doctor not found.'}</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: '650px' }}>
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold text-primary mb-4">{doctor.name}</h2>

          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Qualification:</strong> {doctor.qualification}</p>
          <p><strong>Experience:</strong> {doctor.experience} years</p>
          <p><strong>Consultation Fee:</strong> ₹{doctor.consultationFee}</p>

          <div className="d-flex gap-2 mt-4">
            <Link
              to={`/appointments/book?doctorId=${doctor.id}`}
              className="btn btn-primary"
            >
              Book Appointment
            </Link>

            <Link to="/doctors" className="btn btn-outline-secondary">
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
