import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaBrain, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ width: '100%' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Your Mental Health Matters
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'white',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Take the first step towards better mental health with our confidential wellness assessments and personalized resources.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          color: 'white'
        }}>
          Why Choose Our MindMate?
        </h2>
        
        <div className="grid grid-3">
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <FaBrain style={{ fontSize: '3rem', color: '#667eea' }} />
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Evidence-Based Assessments</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Take standardized PHQ-9 and GAD-7 assessments to evaluate depression and anxiety symptoms with clinical accuracy.
            </p>
          </div>

          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <FaHeart style={{ fontSize: '3rem', color: '#667eea' }} />
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Personalized Resources</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Receive tailored recommendations including meditation tips, crisis hotlines, and helpful books based on your assessment results.
            </p>
          </div>

          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <FaShieldAlt style={{ fontSize: '3rem', color: '#667eea' }} />
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Confidential & Secure</h3>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Your privacy is our priority. All data is encrypted and stored securely with JWT authentication.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '4rem 0' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          color: 'white'
        }}>
          How It Works
        </h2>

        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>1. Create Your Account</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Sign up for a free account to start your wellness journey. Your information is kept confidential and secure.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>2. Take Assessments</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Complete PHQ-9 (depression) and GAD-7 (anxiety) questionnaires to understand your current mental health status.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>3. Get Personalized Results</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Receive your assessment scores and severity levels with detailed explanations of what they mean.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>4. Access Resources</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Explore recommended meditation techniques, crisis hotlines, books, and professional therapy options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 0', 
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        margin: '2rem 0'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: 'white'
        }}>
          Ready to Start Your Wellness Journey?
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'white',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Join thousands of users who have taken the first step towards better mental health.
        </p>
        {!isAuthenticated && (
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
            Get Started Today
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home; 