
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/doctors');
        setDoctors(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Unable to load doctors. Please check the backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name || ''} ${doctor.specialization || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-primary fw-bold">OUR MEDICAL TEAM</span>
        <h1 className="section-title mt-2">Find Your Doctor</h1>
        <p className="text-secondary">
          Connect with experienced healthcare professionals.
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search by doctor name or speciality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p className="text-center">Loading doctors...</p>}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-5">
              <h5>No doctors found</h5>
              <p className="text-secondary">Try another search.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredDoctors.map((doctor) => (
                <div className="col-md-6 col-lg-4" key={doctor.id}>
                  <div className="card shadow-sm h-100 p-4">
                    <div className="text-center">
                      <div className="feature-icon mx-auto">✚</div>
                      <h5 className="fw-bold">{doctor.name}</h5>
                      <span className="badge bg-primary-subtle text-primary mb-3">
                        {doctor.specialization}
                      </span>
                    </div>

                    <div className="text-secondary small mb-3">
                      <p className="mb-2">
                        <strong>Qualification:</strong>{' '}
                        {doctor.qualification || 'Not available'}
                      </p>
                      <p className="mb-2">
                        <strong>Experience:</strong>{' '}
                        {doctor.experience ?? 'Not available'}
                        {doctor.experience !== undefined && doctor.experience !== null ? ' years' : ''}
                      </p>
                      <p className="mb-0">
                        <strong>Consultation Fee:</strong>{' '}
                        {doctor.consultationFee ?? 'Not available'}
                      </p>
                    </div>

                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="btn btn-primary w-100 mt-auto"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Doctors;
