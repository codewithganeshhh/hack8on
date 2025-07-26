const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get meditation resources
router.get('/meditation', auth, (req, res) => {
  const meditationResources = [
    {
      title: 'Mindful Breathing',
      description: 'Simple breathing technique to reduce stress and anxiety',
      duration: '5-10 minutes',
      instructions: 'Sit comfortably, close your eyes, and focus on your breath. Inhale for 4 counts, hold for 4, exhale for 4.',
      link: 'https://www.headspace.com/meditation/breathing'
    },
    {
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation technique to release tension',
      duration: '10-15 minutes',
      instructions: 'Lie down and mentally scan your body from head to toe, releasing tension in each area.',
      link: 'https://www.mindful.org/body-scan-meditation/'
    },
    {
      title: 'Loving-Kindness Meditation',
      description: 'Cultivate compassion for yourself and others',
      duration: '10-20 minutes',
      instructions: 'Send wishes of peace, happiness, and well-being to yourself, loved ones, and all beings.',
      link: 'https://www.mindful.org/loving-kindness-meditation/'
    },
    {
      title: 'Walking Meditation',
      description: 'Mindful walking to connect with your body and surroundings',
      duration: '15-30 minutes',
      instructions: 'Walk slowly and deliberately, focusing on each step and the sensations in your feet.',
      link: 'https://www.mindful.org/walking-meditation/'
    }
  ];

  res.json(meditationResources);
});

// Get crisis hotlines
router.get('/hotlines', auth, (req, res) => {
  const hotlines = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 confidential support for people in distress',
      available: '24/7',
      link: 'tel:988'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Text-based crisis support',
      available: '24/7',
      link: 'https://www.crisistextline.org/'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-HELP (4357)',
      description: 'Treatment referral and information service',
      available: '24/7',
      link: 'tel:1-800-662-4357'
    },
    {
      name: 'The Trevor Project',
      number: '1-866-488-7386',
      description: 'Crisis intervention and suicide prevention for LGBTQ+ youth',
      available: '24/7',
      link: 'tel:1-866-488-7386'
    },
    {
      name: 'Veterans Crisis Line',
      number: '1-800-273-8255',
      description: 'Confidential support for veterans and their families',
      available: '24/7',
      link: 'tel:1-800-273-8255'
    }
  ];

  res.json(hotlines);
});

// Get book recommendations
router.get('/books', auth, (req, res) => {
  const books = [
    {
      title: 'The Happiness Project',
      author: 'Gretchen Rubin',
      description: 'A practical guide to finding happiness in everyday life',
      category: 'Self-help',
      link: 'https://www.gretchenrubin.com/books/the-happiness-project/'
    },
    {
      title: 'Feeling Good: The New Mood Therapy',
      author: 'David D. Burns',
      description: 'Cognitive behavioral therapy approach to depression',
      category: 'Depression',
      link: 'https://feelinggood.com/'
    },
    {
      title: 'The Anxiety and Worry Workbook',
      author: 'David A. Clark and Aaron T. Beck',
      description: 'Evidence-based strategies for managing anxiety',
      category: 'Anxiety',
      link: 'https://www.guilford.com/books/The-Anxiety-and-Worry-Workbook/Clark-Beck/9781462506668'
    },
    {
      title: 'Mindfulness: An Eight-Week Plan for Finding Peace',
      author: 'Mark Williams and Danny Penman',
      description: 'Mindfulness-based cognitive therapy for stress and depression',
      category: 'Mindfulness',
      link: 'https://www.amazon.com/Mindfulness-Eight-Week-Plan-Finding-Peace/dp/1609618955'
    },
    {
      title: 'The Body Keeps the Score',
      author: 'Bessel van der Kolk',
      description: 'Understanding trauma and its effects on the body and mind',
      category: 'Trauma',
      link: 'https://www.besselvanderkolk.com/the-body-keeps-the-score.html'
    },
    {
      title: 'Daring Greatly',
      author: 'Brené Brown',
      description: 'How the courage to be vulnerable transforms the way we live',
      category: 'Self-help',
      link: 'https://brenebrown.com/book/daring-greatly/'
    },
    {
      title: 'The Gifts of Imperfection',
      author: 'Brené Brown',
      description: 'Let go of who you think you\'re supposed to be and embrace who you are',
      category: 'Self-help',
      link: 'https://brenebrown.com/book/the-gifts-of-imperfection/'
    },
    {
      title: 'Man\'s Search for Meaning',
      author: 'Viktor E. Frankl',
      description: 'A psychiatrist\'s experiences in Nazi concentration camps',
      category: 'Psychology',
      link: 'https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X'
    }
  ];

  res.json(books);
});

// Get exercise recommendations
router.get('/exercise', auth, (req, res) => {
  const exercises = [
    {
      title: 'Walking',
      description: 'Low-impact aerobic exercise that can improve mood',
      duration: '30 minutes',
      frequency: '3-5 times per week',
      benefits: 'Reduces stress, improves mood, increases energy'
    },
    {
      title: 'Yoga',
      description: 'Combines physical postures, breathing, and meditation',
      duration: '20-60 minutes',
      frequency: '2-3 times per week',
      benefits: 'Reduces anxiety, improves flexibility, promotes mindfulness'
    },
    {
      title: 'Running',
      description: 'High-intensity aerobic exercise that releases endorphins',
      duration: '20-30 minutes',
      frequency: '3-4 times per week',
      benefits: 'Boosts mood, reduces stress, improves cardiovascular health'
    },
    {
      title: 'Strength Training',
      description: 'Building muscle strength and endurance',
      duration: '30-45 minutes',
      frequency: '2-3 times per week',
      benefits: 'Increases confidence, improves body image, reduces anxiety'
    },
    {
      title: 'Swimming',
      description: 'Low-impact full-body workout',
      duration: '20-30 minutes',
      frequency: '2-3 times per week',
      benefits: 'Reduces stress, improves mood, gentle on joints'
    }
  ];

  res.json(exercises);
});

// Get therapy resources
router.get('/therapy', auth, (req, res) => {
  const therapyResources = [
    {
      title: 'Psychology Today Therapist Finder',
      description: 'Find licensed therapists in your area',
      link: 'https://www.psychologytoday.com/us/therapists'
    },
    {
      title: 'BetterHelp',
      description: 'Online therapy platform with licensed counselors',
      link: 'https://www.betterhelp.com/'
    },
    {
      title: 'Talkspace',
      description: 'Online therapy and psychiatry services',
      link: 'https://www.talkspace.com/'
    },
    {
      title: 'GoodTherapy',
      description: 'Directory of therapists and mental health professionals',
      link: 'https://www.goodtherapy.org/'
    },
    {
      title: 'Open Path Collective',
      description: 'Affordable therapy for those without insurance',
      link: 'https://openpathcollective.org/'
    }
  ];

  res.json(therapyResources);
});

// Get all resources
router.get('/all', auth, (req, res) => {
  res.json({
    message: 'Use specific endpoints: /meditation, /hotlines, /books, /exercise, /therapy'
  });
});

module.exports = router; 