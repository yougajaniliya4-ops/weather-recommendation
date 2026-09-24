const express = require('express');
const { fetchWeather } = require('../controllers/weatherController');

const router = express.Router();

router.get('/:city', fetchWeather);

module.exports = router;
