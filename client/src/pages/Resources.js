import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpa, FaPhone, FaBook, FaDumbbell, FaUserMd, FaExternalLinkAlt } from 'react-icons/fa';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('meditation');
  const [resources, setResources] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const [meditation, hotlines, books, exercise, therapy] = await Promise.all([
        axios.get('/api/resources/meditation'),
        axios.get('/api/resources/hotlines'),
        axios.get('/api/resources/books'),
        axios.get('/api/resources/exercise'),
        axios.get('/api/resources/therapy')
      ]);

      setResources({
        meditation: meditation.data,
        hotlines: hotlines.data,
        books: books.data,
        exercise: exercise.data,
        therapy: therapy.data
      });
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'meditation', label: 'Meditation', icon: FaSpa },
    { id: 'hotlines', label: 'Crisis Hotlines', icon: FaPhone },
    { id: 'books', label: 'Books', icon: FaBook },
    { id: 'exercise', label: 'Exercise', icon: FaDumbbell },
    { id: 'therapy', label: 'Therapy', icon: FaUserMd }
  ];

  const renderMeditation = () => (
    <div className="grid grid-2">
      {resources.meditation?.map((item, index) => (
        <div key={index} className="card">
          <h3 style={{ marginBottom: '0.5rem', color: '#667eea' }}>{item.title}</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{item.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#888' }}>Duration: {item.duration}</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
            {item.instructions}
          </p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ marginTop: '1rem', fontSize: '0.9rem' }}
            >
              Learn More <FaExternalLinkAlt style={{ marginLeft: '0.5rem' }} />
            </a>
          )}
        </div>
      ))}
    </div>
  );

  const renderHotlines = () => (
    <div className="grid grid-2">
      {resources.hotlines?.map((hotline, index) => (
        <div key={index} className="card">
          <h3 style={{ marginBottom: '0.5rem', color: '#667eea' }}>{hotline.name}</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{hotline.description}</p>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#e74c3c' }}>
              {hotline.number}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>Available: {hotline.available}</p>
          </div>
          <a
            href={hotline.link}
            className="btn btn-primary"
            style={{ fontSize: '0.9rem' }}
          >
            Call Now
          </a>
        </div>
      ))}
    </div>
  );

  const renderBooks = () => (
    <div className="grid grid-2">
      {resources.books?.map((book, index) => (
        <div key={index} className="card">
          <h3 style={{ marginBottom: '0.5rem', color: '#667eea' }}>{book.title}</h3>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>
            by {book.author}
          </p>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{book.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              backgroundColor: '#f0f0f0',
              fontSize: '0.8rem',
              color: '#666'
            }}>
              {book.category}
            </span>
            {book.link && (
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.9rem' }}
              >
                Learn More <FaExternalLinkAlt style={{ marginLeft: '0.5rem' }} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderExercise = () => (
    <div className="grid grid-2">
      {resources.exercise?.map((exercise, index) => (
        <div key={index} className="card">
          <h3 style={{ marginBottom: '0.5rem', color: '#667eea' }}>{exercise.title}</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{exercise.description}</p>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              <strong>Duration:</strong> {exercise.duration}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              <strong>Frequency:</strong> {exercise.frequency}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              <strong>Benefits:</strong> {exercise.benefits}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTherapy = () => (
    <div className="grid grid-2">
      {resources.therapy?.map((therapy, index) => (
        <div key={index} className="card">
          <h3 style={{ marginBottom: '0.5rem', color: '#667eea' }}>{therapy.title}</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{therapy.description}</p>
          {therapy.link && (
            <a
              href={therapy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem' }}
            >
              Find Therapist <FaExternalLinkAlt style={{ marginLeft: '0.5rem' }} />
            </a>
          )}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'meditation':
        return renderMeditation();
      case 'hotlines':
        return renderHotlines();
      case 'books':
        return renderBooks();
      case 'exercise':
        return renderExercise();
      case 'therapy':
        return renderTherapy();
      default:
        return renderMeditation();
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="flex-center" style={{ minHeight: '80vh' }}>
          <div className="card">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#667eea', marginBottom: '1rem' }}>⏳</div>
              <p style={{ color: '#666' }}>Loading resources...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ 
          color: 'white', 
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}>
          Mental Health Resources
        </h1>
        <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Explore curated resources to support your mental health journey.
        </p>

        {/* Tab Navigation */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: activeTab === tab.id ? '#667eea' : '#f0f0f0',
                    color: activeTab === tab.id ? 'white' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Resources; 