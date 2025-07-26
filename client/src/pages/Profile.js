import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaBirthdayCake, FaVenusMars, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    gender: user?.gender || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age || '',
      gender: user?.gender || ''
    });
    setIsEditing(false);
  };

  const getGenderLabel = (gender) => {
    const labels = {
      male: 'Male',
      female: 'Female',
      other: 'Other',
      'prefer-not-to-say': 'Prefer not to say'
    };
    return labels[gender] || gender;
  };

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#667eea', margin: 0 }}>Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <FaEdit />
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <FaUser style={{ marginRight: '0.5rem' }} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope style={{ marginRight: '0.5rem' }} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  className="form-input"
                  disabled
                  style={{ backgroundColor: '#f5f5f5' }}
                />
                <small style={{ color: '#666', fontSize: '0.8rem' }}>
                  Email cannot be changed
                </small>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <FaBirthdayCake style={{ marginRight: '0.5rem' }} />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                    min="13"
                    max="120"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaVenusMars style={{ marginRight: '0.5rem' }} />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FaSave />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="form-group">
                <label className="form-label">
                  <FaUser style={{ marginRight: '0.5rem' }} />
                  Full Name
                </label>
                <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: 0 }}>
                  {user?.name}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope style={{ marginRight: '0.5rem' }} />
                  Email Address
                </label>
                <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: 0 }}>
                  {user?.email}
                </p>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <FaBirthdayCake style={{ marginRight: '0.5rem' }} />
                    Age
                  </label>
                  <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: 0 }}>
                    {user?.age || 'Not specified'}
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaVenusMars style={{ marginRight: '0.5rem' }} />
                    Gender
                  </label>
                  <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: 0 }}>
                    {user?.gender ? getGenderLabel(user.gender) : 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Account Created</label>
                <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: 0 }}>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </p>
              </div>

              {user?.lastAssessment && (
                <div className="form-group">
                  <label className="form-label">Last Assessment</label>
                  <p style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '8px', margin: 0 }}>
                    {new Date(user.lastAssessment).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 