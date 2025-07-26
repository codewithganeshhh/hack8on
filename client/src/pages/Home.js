import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaBrain, FaShieldAlt, FaUserFriends, FaClipboardCheck, FaSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';

const featureVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, type: 'spring' }
  })
};

// Animated background elements
const FloatingElement = ({ children, delay = 0, duration = 20 }) => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      rotate: [0, 5, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: 'absolute',
      opacity: 0.1,
      pointerEvents: 'none',
    }}
  >
    {children}
  </motion.div>
);

const stats = [
  { icon: <FaUserFriends style={{ color: '#764ba2', fontSize: 32 }} />, label: 'Users Helped', value: 1200 },
  { icon: <FaClipboardCheck style={{ color: '#667eea', fontSize: 32 }} />, label: 'Assessments Taken', value: 3500 },
  { icon: <FaSmile style={{ color: '#fbc531', fontSize: 32 }} />, label: 'Positive Outcomes', value: 1100 }
];

const faqs = [
  {
    q: 'Is my data private?',
    a: 'Absolutely. All your data is encrypted and never shared. You are always in control.'
  },
  {
    q: 'Are the assessments clinically valid?',
    a: 'Yes! PHQ-9 and GAD-7 are widely used, evidence-based screening tools.'
  },
  {
    q: 'Can I use this for free?',
    a: 'Yes, the platform is completely free for all users.'
  },
  {
    q: 'What if I need urgent help?',
    a: 'We provide direct links to crisis hotlines and professional resources for immediate support.'
  }
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          backgroundSize: '400% 400%',
          opacity: 0.8,
        }}
      />

      {/* Floating animated elements */}
      <FloatingElement delay={0} duration={25} style={{ top: '10%', left: '10%' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }} />
      </FloatingElement>
      
      <FloatingElement delay={5} duration={30} style={{ top: '20%', right: '15%' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }} />
      </FloatingElement>
      
      <FloatingElement delay={10} duration={20} style={{ bottom: '30%', left: '20%' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }} />
      </FloatingElement>
      
      <FloatingElement delay={15} duration={35} style={{ bottom: '20%', right: '25%' }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }} />
      </FloatingElement>

      {/* Subtle particle effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <section
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: '100%', zIndex: 1 }}>
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-2px',
                textShadow: '0 4px 20px rgba(255,255,255,0.3)',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
              }}
            >
              Your Mental Health Matters
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              style={{
                fontSize: '1.3rem',
                color: '#ffffff',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                fontWeight: 500,
              }}
            >
              Take the first step towards better mental health with our confidential wellness assessments and personalized resources.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary" style={{ 
                  fontSize: '1.1rem', 
                  padding: '1rem 2rem', 
                  boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#667eea',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                }}>
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary" style={{ 
                    fontSize: '1.1rem', 
                    padding: '1rem 2rem', 
                    boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.9)',
                    color: '#667eea',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                  }}>
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-secondary" style={{ 
                    fontSize: '1.1rem', 
                    padding: '1rem 2rem', 
                    background: 'rgba(255,255,255,0.2)', 
                    color: '#ffffff',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Stats/Impact Section */}
        <section style={{ padding: '2.5rem 0 1.5rem 0' }}>
          <div className="grid grid-3" style={{ maxWidth: 900, margin: '0 auto' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                style={{ 
                  textAlign: 'center', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#ffffff', 
                  boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div style={{ marginBottom: 10 }}>{stat.icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{stat.value.toLocaleString()}</div>
                <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '2rem 0' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#ffffff',
            letterSpacing: '-1px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            fontWeight: 700,
          }}>
            Why Choose Our MindMate?
          </h2>
          <div className="grid grid-3">
            {[
              {
                icon: <FaBrain style={{ fontSize: '3rem', color: '#ffffff' }} />, title: 'Evidence-Based Assessments',
                desc: 'Take standardized PHQ-9 and GAD-7 assessments to evaluate depression and anxiety symptoms with clinical accuracy.'
              },
              {
                icon: <FaHeart style={{ fontSize: '3rem', color: '#ffffff' }} />, title: 'Personalized Resources',
                desc: 'Receive tailored recommendations including meditation tips, crisis hotlines, and helpful books based on your assessment results.'
              },
              {
                icon: <FaShieldAlt style={{ fontSize: '3rem', color: '#ffffff' }} />, title: 'Confidential & Secure',
                desc: 'Your privacy is our priority. All data is encrypted and stored securely with JWT authentication.'
              }
            ].map((f, i) => (
              <motion.div
                className="card"
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={featureVariants}
                style={{ 
                  minHeight: 220, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#ffffff', 
                  boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 700 }}>{f.title}</h3>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Motivational Quote/Testimonial Section */}
        <section style={{ padding: '2.5rem 0', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 1 }}
            className="card"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              maxWidth: 600,
              margin: '0 auto',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <blockquote style={{ fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '1rem', color: '#ffffff' }}>
              "You don't have to control your thoughts. You just have to stop letting them control you."
            </blockquote>
            <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>— Dan Millman</div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section style={{ padding: '4rem 0' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#ffffff',
            letterSpacing: '-1px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            fontWeight: 700,
          }}>
            How It Works
          </h2>
          <div className="grid grid-2">
            {[
              {
                title: '1. Create Your Account',
                desc: 'Sign up for a free account to start your wellness journey. Your information is kept confidential and secure.'
              },
              {
                title: '2. Take Assessments',
                desc: 'Complete PHQ-9 (depression) and GAD-7 (anxiety) questionnaires to understand your current mental health status.'
              },
              {
                title: '3. Get Personalized Results',
                desc: 'Receive your assessment scores and severity levels with detailed explanations of what they mean.'
              },
              {
                title: '4. Access Resources',
                desc: 'Explore recommended meditation techniques, crisis hotlines, books, and professional therapy options.'
              }
            ].map((step, i) => (
              <motion.div
                className="card"
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={featureVariants}
                style={{ 
                  minHeight: 160, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#ffffff', 
                  boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <h3 style={{ marginBottom: '1rem', color: '#ffffff', fontWeight: 700 }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: '3rem 0 2rem 0', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#ffffff', marginBottom: '2rem', textShadow: '0 4px 20px rgba(0,0,0,0.3)', fontWeight: 700 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: 10, 
                  boxShadow: '0 8px 32px rgba(255,255,255,0.1)', 
                  padding: '1.2rem 1.5rem', 
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {faq.q}
                  <span style={{ fontSize: 22, color: '#ffffff', marginLeft: 10 }}>{openFaq === i ? '-' : '+'}</span>
                </div>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden', marginTop: 10, color: 'rgba(255,255,255,0.9)' }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '4rem 0',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '16px',
          margin: '2rem 0',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#ffffff',
              letterSpacing: '-1px',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              fontWeight: 700,
            }}
          >
            Ready to Start Your Wellness Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: 0.2, duration: 1 }}
            style={{
              fontSize: '1.2rem',
              color: '#ffffff',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}
          >
            Join thousands of users who have taken the first step towards better mental health.
          </motion.p>
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Link to="/register" className="btn btn-primary" style={{ 
                fontSize: '1.2rem', 
                padding: '1rem 2.5rem', 
                boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.9)',
                color: '#667eea',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
              }}>
                Get Started Today
              </Link>
            </motion.div>
          )}
        </section>
      </div>
      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem 0 1rem 0', 
        color: 'rgba(255,255,255,0.8)', 
        background: 'transparent', 
        fontSize: '1rem',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ marginBottom: 8 }}>
          <b>MindMate</b> &copy; {new Date().getFullYear()} &mdash; Built for mental health awareness
        </div>
        <div>
          <a href="/" style={{ color: '#ffffff', textDecoration: 'none', marginRight: 12 }}>Home</a>
          <a href="/resources" style={{ color: '#ffffff', textDecoration: 'none', marginRight: 12 }}>Resources</a>
          <a href="/profile" style={{ color: '#ffffff', textDecoration: 'none' }}>Profile</a>
        </div>
      </footer>
    </div>
  );
};

export default Home; 