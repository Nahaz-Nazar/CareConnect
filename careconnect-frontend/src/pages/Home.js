
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                YOUR HEALTH, OUR PRIORITY
              </span>

              <h1 className="hero-title mb-4">
                Quality Healthcare
                <br />
                Made Simple.
              </h1>

              <p className="hero-description mb-4">
                Find experienced doctors, explore medical
                specialities and book your appointments easily.
                Your journey to better health starts here.
              </p>

              <Link to="/doctors" className="btn btn-primary me-2">
                Find a Doctor →
              </Link>

              <Link to="/register" className="btn btn-outline-primary">
                Get Started
              </Link>

              <div className="d-flex gap-4 mt-4 flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-0">Easy</h5>
                  <small className="text-secondary">Online Booking</small>
                </div>
                <div>
                  <h5 className="fw-bold text-primary mb-0">Trusted</h5>
                  <small className="text-secondary">Medical Care</small>
                </div>
                <div>
                  <h5 className="fw-bold text-primary mb-0">Secure</h5>
                  <small className="text-secondary">Patient Access</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000"
                alt="Healthcare professional providing patient care"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="stats-number">24/7</div>
              <div>Patient Access</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stats-number">Easy</div>
              <div>Appointment Booking</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stats-number">Secure</div>
              <div>Patient Information</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stats-number">Online</div>
              <div>Healthcare Services</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5 my-4">
        <div className="text-center mb-5">
          <span className="text-primary fw-bold">OUR SERVICES</span>
          <h2 className="section-title mt-2">Healthcare Made Easier</h2>
          <p className="text-secondary">
            Everything you need to manage your healthcare journey.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">✚</div>
              <h5 className="fw-bold">Find Doctors</h5>
              <p className="text-secondary">
                Explore available doctors and their medical specialities.
              </p>
              <Link to="/doctors" className="fw-bold text-primary">
                Explore Doctors →
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">▦</div>
              <h5 className="fw-bold">Book Appointments</h5>
              <p className="text-secondary">
                Choose a doctor and request your preferred appointment.
              </p>
              <Link to="/doctors" className="fw-bold text-primary">
                Book Now →
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">♡</div>
              <h5 className="fw-bold">Manage Your Care</h5>
              <p className="text-secondary">
                View your appointments and manage your patient account.
              </p>
              <Link to="/login" className="fw-bold text-primary">
                Patient Login →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="cta-section text-center">
          <h2 className="section-title mb-3">
            Take the First Step Towards Better Health
          </h2>
          <p className="text-secondary mb-4">
            Create your patient account and connect with healthcare services.
          </p>
          <Link to="/register" className="btn btn-primary">
            Create Patient Account →
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
