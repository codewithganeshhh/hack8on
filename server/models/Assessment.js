const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['PHQ9', 'GAD7'],
    required: true
  },
  answers: [{
    questionNumber: {
      type: Number,
      required: true
    },
    answer: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    }
  }],
  totalScore: {
    type: Number,
    required: true
  },
  severity: {
    type: String,
    enum: ['minimal', 'mild', 'moderate', 'moderately-severe', 'severe'],
    required: true
  },
  recommendations: [{
    type: {
      type: String,
      enum: ['meditation', 'hotline', 'book', 'exercise', 'therapy'],
      required: true
    },
    title: String,
    description: String,
    link: String
  }],
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate severity based on score and assessment type
assessmentSchema.methods.calculateSeverity = function() {
  if (this.type === 'PHQ9') {
    if (this.totalScore <= 4) return 'minimal';
    if (this.totalScore <= 9) return 'mild';
    if (this.totalScore <= 14) return 'moderate';
    if (this.totalScore <= 19) return 'moderately-severe';
    return 'severe';
  } else if (this.type === 'GAD7') {
    if (this.totalScore <= 4) return 'minimal';
    if (this.totalScore <= 9) return 'mild';
    if (this.totalScore <= 14) return 'moderate';
    return 'severe';
  }
};

module.exports = mongoose.model('Assessment', assessmentSchema); 