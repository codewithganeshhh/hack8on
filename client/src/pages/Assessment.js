import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';

const Assessment = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const fetchAssessment = useCallback(async () => {
    try {
      const response = await axios.get(`/api/assessments/questions/${type}`);
      setAssessment(response.data);
    } catch (error) {
      console.error('Error fetching assessment:', error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionNumber: currentQuestion + 1,
      answer: answer
    };
    setAnswers(newAnswers);

    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const response = await axios.post('/api/assessments/submit', {
        type: assessment.type,
        answers: finalAnswers
      });
      setResults(response.data.assessment);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSubmitting(false);
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

  const getSeverityDescription = (severity) => {
    const descriptions = {
      minimal: 'Your symptoms are minimal. Continue with self-care practices.',
      mild: 'You may be experiencing mild symptoms. Consider self-help strategies.',
      moderate: 'Your symptoms are moderate. Professional help may be beneficial.',
      'moderately-severe': 'Your symptoms are moderately severe. Professional help is recommended.',
      severe: 'Your symptoms are severe. Please seek professional help immediately.'
    };
    return descriptions[severity] || '';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="flex-center" style={{ minHeight: '80vh' }}>
          <div className="card">
            <div style={{ textAlign: 'center' }}>
              <FaSpinner style={{ fontSize: '2rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '1rem', color: '#666' }}>Loading assessment...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="container">
        <div className="flex-center" style={{ minHeight: '80vh' }}>
          <div className="card">
            <h2 style={{ textAlign: 'center', color: '#e74c3c' }}>Assessment not found</h2>
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    return (
      <div className="container">
        <div style={{ padding: '2rem 0' }}>
          <div className="card">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#667eea' }}>
              Assessment Complete!
            </h2>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{assessment.title}</h3>
              <div style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                borderRadius: '8px',
                backgroundColor: getSeverityColor(results.severity),
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {results.severity}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#333' }}>Your Score</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                {results.totalScore}/{assessment.type === 'PHQ9' ? '27' : '21'}
              </p>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>
                {getSeverityDescription(results.severity)}
              </p>
            </div>

            {results.recommendations && results.recommendations.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#333' }}>Recommended Resources</h4>
                <div className="grid grid-2">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="card" style={{ margin: '0.5rem 0' }}>
                      <h5 style={{ marginBottom: '0.5rem', color: '#667eea' }}>{rec.title}</h5>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {rec.description}
                      </p>
                      {rec.link && (
                        <a
                          href={rec.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ fontSize: '0.9rem' }}
                        >
                          Learn More
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = assessment.questions[currentQuestion];
  const answerOptions = [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Several days' },
    { value: 2, label: 'More than half the days' },
    { value: 3, label: 'Nearly every day' }
  ];

  return (
    <div className="container">
      <div style={{ padding: '2rem 0' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{assessment.title}</h2>
            <p style={{ color: '#666' }}>{assessment.description}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e1e5e9', 
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%`,
                height: '100%',
                backgroundColor: '#667eea',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Question {currentQuestion + 1} of {assessment.questions.length}
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#333', fontSize: '1.2rem' }}>
              {question.text}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  disabled={submitting}
                  style={{
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    background: 'white',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.backgroundColor = '#f8f9ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.target.style.borderColor = '#e1e5e9';
                      e.target.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{option.label}</span>
                    <FaArrowRight style={{ color: '#667eea' }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {submitting && (
            <div style={{ textAlign: 'center' }}>
              <FaSpinner style={{ fontSize: '2rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '1rem', color: '#666' }}>Processing your responses...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment; 