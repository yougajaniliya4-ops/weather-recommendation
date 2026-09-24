const express = require('express');
const { weatherSummary, weatherRecommendation } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/weather-summary', protect, weatherSummary);
router.post('/weather-recommendation', protect, weatherRecommendation);

module.exports = router;
