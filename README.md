# Wellness Chatbot

A comprehensive mental health assessment and support platform that helps young people suffering from stress and depression by providing standardized wellness questionnaires (PHQ-9 and GAD-7) along with personalized resources including meditation tips, crisis hotlines, and book recommendations.

## 🚀 Features

### Core Functionality
- **PHQ-9 Assessment**: Standardized depression screening questionnaire
- **GAD-7 Assessment**: Generalized anxiety disorder assessment
- **Interactive Chatbot Interface**: User-friendly question-by-question assessment flow
- **Personalized Recommendations**: Tailored resources based on assessment severity
- **Secure Authentication**: JWT-based user authentication and authorization

### Resource Categories
- **Meditation Tips**: Breathing exercises, body scan, loving-kindness meditation
- **Crisis Hotlines**: 24/7 support lines including National Suicide Prevention Lifeline (988)
- **Book Recommendations**: Curated mental health literature
- **Exercise Guidance**: Physical activity recommendations for mental wellness
- **Therapy Resources**: Professional mental health service directories

### Technical Features
- **Full-Stack Architecture**: React.js frontend with Node.js/Express backend
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT authentication, password hashing with bcrypt
- **Responsive Design**: Modern, mobile-friendly UI
- **Real-time Feedback**: Progress tracking and immediate results

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** database with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **cors** for cross-origin requests

### Frontend
- **React.js** with functional components and hooks
- **React Router** for navigation
- **Axios** for API communication
- **React Icons** for UI icons
- **React Hot Toast** for notifications
- **Framer Motion** for animations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd wellness-chatbot
```

### 2. Install Dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/wellness-chatbot
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service
mongod
```

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Production Mode
```bash
# Build the React app
npm run build

# Start the server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📖 Usage Guide

### 1. User Registration
- Visit the homepage and click "Get Started"
- Fill in your details (name, email, password)
- Optional: Add age and gender information

### 2. Taking Assessments
- Navigate to Dashboard
- Choose between PHQ-9 (Depression) or GAD-7 (Anxiety) assessment
- Answer questions honestly based on your experiences over the last 2 weeks
- Receive immediate results with severity levels

### 3. Accessing Resources
- View personalized recommendations after completing assessments
- Browse meditation techniques, crisis hotlines, and book recommendations
- Access professional therapy resources when needed

### 4. Profile Management
- Update personal information
- View assessment history
- Track your mental health journey

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Assessments
- `GET /api/assessments/questions/:type` - Get assessment questions
- `POST /api/assessments/submit` - Submit assessment answers
- `GET /api/assessments/history` - Get user's assessment history
- `GET /api/assessments/:id` - Get specific assessment

### Resources
- `GET /api/resources/meditation` - Meditation resources
- `GET /api/resources/hotlines` - Crisis hotlines
- `GET /api/resources/books` - Book recommendations
- `GET /api/resources/exercise` - Exercise guidance
- `GET /api/resources/therapy` - Therapy resources

## 🏗️ Project Structure

```
wellness-chatbot/
├── server/
│   ├── index.js              # Main server file
│   ├── models/
│   │   ├── User.js           # User model
│   │   └── Assessment.js     # Assessment model
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── assessments.js    # Assessment routes
│   │   └── resources.js      # Resource routes
│   └── middleware/
│       └── auth.js           # JWT authentication middleware
├── client/
│   ├── public/
│   │   └── index.html        # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js     # Navigation component
│   │   │   └── PrivateRoute.js # Protected route component
│   │   ├── contexts/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js       # Landing page
│   │   │   ├── Login.js      # Login page
│   │   │   ├── Register.js   # Registration page
│   │   │   ├── Dashboard.js  # User dashboard
│   │   │   ├── Assessment.js # Assessment interface
│   │   │   ├── Resources.js  # Resources page
│   │   │   └── Profile.js    # User profile page
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   └── package.json          # Client dependencies
├── package.json              # Server dependencies
├── .env                      # Environment variables
└── README.md                # Project documentation
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet Security**: HTTP headers for security
- **Environment Variables**: Sensitive data stored in environment variables

## 🎯 Assessment Scoring

### PHQ-9 (Depression)
- **0-4**: Minimal depression
- **5-9**: Mild depression
- **10-14**: Moderate depression
- **15-19**: Moderately severe depression
- **20-27**: Severe depression

### GAD-7 (Anxiety)
- **0-4**: Minimal anxiety
- **5-9**: Mild anxiety
- **10-14**: Moderate anxiety
- **15-21**: Severe anxiety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Notes

- This application is for educational and hackathon purposes
- It is not a substitute for professional medical advice
- Always seek professional help for severe mental health concerns
- Crisis hotlines are available 24/7 for immediate support

## 🆘 Crisis Resources

If you or someone you know is in crisis:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

## 📞 Support

For technical support or questions about the application, please open an issue in the repository.

---

**Built with ❤️ for mental health awareness and support** 