
import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Please login to view your profile.
        </div>
      </div>
    );
  }

  const getValue = (...values) => {
    const value = values.find(
      (item) => item !== undefined && item !== null && item !== ''
    );

    return value || 'Not available';
  };

  const firstName = getValue(user.firstName, user.first_name);
  const lastName = getValue(user.lastName, user.last_name);

  const fullName =
    firstName !== 'Not available' || lastName !== 'Not available'
      ? `${firstName === 'Not available' ? '' : firstName} ${
          lastName === 'Not available' ? '' : lastName
        }`.trim()
      : getValue(user.name, user.userName, user.user_name);

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: '650px' }}>
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">My Patient Profile</h3>
        </div>

        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div
              className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
              style={{
                width: '85px',
                height: '85px',
                fontSize: '35px'
              }}
            >
              {fullName.charAt(0).toUpperCase()}
            </div>

            <h4 className="text-primary mt-3">{fullName}</h4>
            <p className="text-muted">Patient Account</p>
          </div>

          <hr />

          <p>
            <strong>First Name:</strong>{' '}
            {getValue(user.firstName, user.first_name)}
          </p>

          <p>
            <strong>Last Name:</strong>{' '}
            {getValue(user.lastName, user.last_name)}
          </p>

          <p>
            <strong>Email:</strong>{' '}
            {getValue(user.email)}
          </p>

          <p>
            <strong>Phone Number:</strong>{' '}
            {getValue(user.phoneNumber, user.phone_number, user.phone)}
          </p>

          <p>
            <strong>Gender:</strong>{' '}
            {getValue(user.gender)}
          </p>

          <p>
            <strong>Date of Birth:</strong>{' '}
            {getValue(user.dateOfBirth, user.date_of_birth)}
          </p>

          <p className="mb-0">
            <strong>Address:</strong>{' '}
            {getValue(user.address)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
