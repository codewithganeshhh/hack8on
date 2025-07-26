import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaBrain, FaHeart, FaChartLine, FaHistory, FaBook, FaPhone } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await axios.get('/api/assessments/history');
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      minimal: '#4CAF50',
      mild: '#8BC34A',
      moderate: '#FF9800',
      'moderately-severe': '#FF5722',
      severe: '#F44336'
    };
    return colors[severity] || '#666';
  };

  const getLatestAssessment = (type) => {
    return assessments
      .filter(assessment => assessment.type === type)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];
  };

  const latestPHQ9 = getLatestAssessment('PHQ9');
  const latestGAD7 = getLatestAssessment('GAD7');

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ 
          color: 'white', 
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}>
          Welcome back, {user?.name}!
        </h1>
        <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Track your mental health and access personalized resources.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <FaBrain style={{ fontSize: '3rem', color: '#667eea' }} />
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Depression Assessment (PHQ-9)</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
              Evaluate symptoms of depression over the last 2 weeks.
            </p>
            <Link to="/assessment/PHQ9" className="btn btn-primary" style={{ width: '100%' }}>
              Take Assessment
            </Link>
          </div>

          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <FaHeart style={{ fontSize: '3rem', color: '#667eea' }} />
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Anxiety Assessment (GAD-7)</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
              Assess symptoms of anxiety and worry over the last 2 weeks.
            </p>
            <Link to="/assessment/GAD7" className="btn btn-primary" style={{ width: '100%' }}>
              Take Assessment
            </Link>
          </div>
        </div>

        {/* Recent Results */}
        <div className="card">
          <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>
            <FaChartLine style={{ marginRight: '0.5rem' }} />
            Recent Assessment Results
          </h2>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Loading your results...</p>
          ) : (
            <div className="grid grid-2">
              <div>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Depression (PHQ-9)</h3>
                {latestPHQ9 ? (
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>Score: {latestPHQ9.totalScore}/27</span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        color: 'white',
                        backgroundColor: getSeverityColor(latestPHQ9.severity),
                        fontSize: '0.9rem',
                        textTransform: 'capitalize'
                      }}>
                        {latestPHQ9.severity}
                      </span>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      Completed: {new Date(latestPHQ9.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic' }}>No PHQ-9 assessment completed yet.</p>
                )}
              </div>

              <div>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Anxiety (GAD-7)</h3>
                {latestGAD7 ? (
                  <div style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>Score: {latestGAD7.totalScore}/21</span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        color: 'white',
                        backgroundColor: getSeverityColor(latestGAD7.severity),
                        fontSize: '0.9rem',
                        textTransform: 'capitalize'
                      }}>
                        {latestGAD7.severity}
                      </span>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      Completed: {new Date(latestGAD7.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic' }}>No GAD-7 assessment completed yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Resources */}
        <div className="card">
          <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>
            Quick Resources
          </h2>
          <div className="grid grid-3">
            <Link to="/resources" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <FaBook style={{ fontSize: '2rem', color: '#667eea' }} />
              </div>
              <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Meditation Tips</h3>
              <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                Learn breathing techniques and mindfulness practices
              </p>
            </Link>

            <Link to="/resources" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <FaPhone style={{ fontSize: '2rem', color: '#667eea' }} />
              </div>
              <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Crisis Hotlines</h3>
              <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                Get immediate support when you need it most
              </p>
            </Link>

            <Link to="/resources" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <FaHistory style={{ fontSize: '2rem', color: '#667eea' }} />
              </div>
              <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Assessment History</h3>
              <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                View your past assessments and track progress
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 