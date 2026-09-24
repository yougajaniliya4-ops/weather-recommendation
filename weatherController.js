const { getWeather } = require('../services/weatherService');

const fetchWeather = async (req, res) => {
  try {
    const { city } = req.params;
    const weather = await getWeather(city);
    res.status(200).json({ success: true, data: weather });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { fetchWeather };
