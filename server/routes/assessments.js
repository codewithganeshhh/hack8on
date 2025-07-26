const express = require('express');
const { body, validationResult } = require('express-validator');
const Assessment = require('../models/Assessment');
const auth = require('../middleware/auth');

const router = express.Router();

// PHQ-9 questions
const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading the newspaper or watching television?",
  "Moving or speaking slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
  "Thoughts that you would be better off dead or of hurting yourself in some way?"
];

// GAD-7 questions
const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge?",
  "Not being able to stop or control worrying?",
  "Worrying too much about different things?",
  "Trouble relaxing?",
  "Being so restless that it's hard to sit still?",
  "Becoming easily annoyed or irritable?",
  "Feeling afraid as if something awful might happen?"
];

// Get assessment questions
router.get('/questions/:type', auth, (req, res) => {
  const { type } = req.params;
  
  if (type === 'PHQ9') {
    res.json({
      type: 'PHQ9',
      title: 'Patient Health Questionnaire (PHQ-9)',
      description: 'This questionnaire helps assess depression symptoms over the last 2 weeks.',
      questions: PHQ9_QUESTIONS.map((question, index) => ({
        number: index + 1,
        text: question
      }))
    });
  } else if (type === 'GAD7') {
    res.json({
      type: 'GAD7',
      title: 'Generalized Anxiety Disorder Assessment (GAD-7)',
      description: 'This questionnaire helps assess anxiety symptoms over the last 2 weeks.',
      questions: GAD7_QUESTIONS.map((question, index) => ({
        number: index + 1,
        text: question
      }))
    });
  } else {
    res.status(400).json({ message: 'Invalid assessment type' });
  }
});

// Submit assessment
router.post('/submit', auth, [
  body('type').isIn(['PHQ9', 'GAD7']),
  body('answers').isArray({ min: 1 }),
  body('answers.*.questionNumber').isInt({ min: 1 }),
  body('answers.*.answer').isInt({ min: 0, max: 3 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, answers } = req.body;
    
    // Calculate total score
    const totalScore = answers.reduce((sum, answer) => sum + answer.answer, 0);
    
    // Calculate severity
    let severity;
    if (type === 'PHQ9') {
      if (totalScore <= 4) severity = 'minimal';
      else if (totalScore <= 9) severity = 'mild';
      else if (totalScore <= 14) severity = 'moderate';
      else if (totalScore <= 19) severity = 'moderately-severe';
      else severity = 'severe';
    } else if (type === 'GAD7') {
      if (totalScore <= 4) severity = 'minimal';
      else if (totalScore <= 9) severity = 'mild';
      else if (totalScore <= 14) severity = 'moderate';
      else severity = 'severe';
    }

    // Generate recommendations based on severity
    const recommendations = generateRecommendations(severity, type);

    // Create assessment record
    const assessment = new Assessment({
      userId: req.user._id,
      type,
      answers,
      totalScore,
      severity,
      recommendations
    });

    await assessment.save();

    // Update user's last assessment date
    await req.user.updateOne({ lastAssessment: new Date() });

    res.status(201).json({
      assessment,
      message: 'Assessment completed successfully'
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's assessment history
router.get('/history', auth, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user._id })
      .sort({ completedAt: -1 })
      .limit(10);
    
    res.json(assessments);
  } catch (error) {
    console.error('Assessment history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific assessment
router.get('/:id', auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (error) {
    console.error('Get assessment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate recommendations based on severity and assessment type
function generateRecommendations(severity, type) {
  const recommendations = [];

  // Meditation recommendations for all severities
  recommendations.push({
    type: 'meditation',
    title: 'Mindful Breathing',
    description: 'Practice deep breathing exercises for 5-10 minutes daily',
    link: 'https://www.headspace.com/meditation/breathing'
  });

  if (severity === 'minimal' || severity === 'mild') {
    recommendations.push({
      type: 'exercise',
      title: 'Regular Exercise',
      description: 'Try to get 30 minutes of moderate exercise 3-5 times per week',
      link: 'https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495'
    });
    
    recommendations.push({
      type: 'book',
      title: 'The Happiness Project',
      description: 'A practical guide to finding happiness in everyday life',
      link: 'https://www.gretchenrubin.com/books/the-happiness-project/'
    });
  }

  if (severity === 'moderate' || severity === 'moderately-severe' || severity === 'severe') {
    recommendations.push({
      type: 'hotline',
      title: 'National Suicide Prevention Lifeline',
      description: '24/7 confidential support for people in distress',
      link: 'tel:988'
    });
    
    recommendations.push({
      type: 'therapy',
      title: 'Professional Therapy',
      description: 'Consider speaking with a mental health professional',
      link: 'https://www.psychologytoday.com/us/therapists'
    });
  }

  if (severity === 'severe') {
    recommendations.push({
      type: 'hotline',
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741 for immediate crisis support',
      link: 'https://www.crisistextline.org/'
    });
  }

  // Type-specific recommendations
  if (type === 'PHQ9') {
    recommendations.push({
      type: 'book',
      title: 'Feeling Good: The New Mood Therapy',
      description: 'A cognitive behavioral therapy approach to depression',
      link: 'https://feelinggood.com/'
    });
  } else if (type === 'GAD7') {
    recommendations.push({
      type: 'book',
      title: 'The Anxiety and Worry Workbook',
      description: 'Evidence-based strategies for managing anxiety',
      link: 'https://www.guilford.com/books/The-Anxiety-and-Worry-Workbook/Clark-Beck/9781462506668'
    });
  }

  return recommendations;
}

module.exports = router; 