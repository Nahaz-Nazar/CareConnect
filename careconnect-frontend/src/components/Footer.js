import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <h4 className="fw-bold text-white">✚ CareConnect</h4>
            <p className="mt-3">
              Your health, our priority. Connect with trusted doctors
              and manage your healthcare appointments easily.
            </p>
          </div>

          <div className="col-md-3">
            <h5 className="text-white">Quick Links</h5>
            <p><Link className="text-light" to="/">Home</Link></p>
            <p><Link className="text-light" to="/doctors">Find Doctors</Link></p>
            <p><Link className="text-light" to="/login">Patient Login</Link></p>
          </div>

          <div className="col-md-4">
            <h5 className="text-white">Contact</h5>
            <p>Email: support@careconnect.com</p>
            <p>Online Patient Support</p>
          </div>
        </div>

        <hr className="border-light opacity-25" />

        <p className="text-center mb-0">
          © 2026 CareConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;