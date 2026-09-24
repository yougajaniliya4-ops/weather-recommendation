const { generateWeatherSummary, generateWeatherRecommendation } = require('../services/aiService');

const weatherSummary = async (req, res) => {
  try {
    const { city, temperature, humidity, condition } = req.body;
    if (!city || temperature === undefined || humidity === undefined || !condition) {
      return res.status(400).json({ success: false, message: 'Please provide city, temperature, humidity, and condition' });
    }
    const result = await generateWeatherSummary({ city, temperature, humidity, condition });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const weatherRecommendation = async (req, res) => {
  try {
    const { temperature, condition } = req.body;
    if ((temperature === undefined || temperature === null) || !condition) {
      return res.status(400).json({ success: false, message: 'Please provide temperature and condition' });
    }
    const result = await generateWeatherRecommendation({ temperature, condition });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { weatherSummary, weatherRecommendation };
