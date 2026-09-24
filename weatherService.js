const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const isKeyConfigured = (key) => key && !key.startsWith('YOUR_') && !key.startsWith('your_');

// Deterministic mock weather so the same city always returns the same values
const getMockWeather = (city) => {
  let seed = 0;
  for (let i = 0; i < city.length; i++) seed += city.charCodeAt(i);

  const conditions = ['Clear', 'Clouds', 'Rain', 'Sunny', 'Windy'];
  const condition = conditions[seed % conditions.length];
  const temperature = 15 + (seed % 20); // 15-34 C
  const humidity = 40 + (seed % 50); // 40-89 %
  const windSpeed = 2 + (seed % 15); // 2-16 m/s

  return { city, temperature, humidity, windSpeed, condition, source: 'mock' };
};

const getWeather = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!isKeyConfigured(apiKey)) {
    return getMockWeather(city);
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      return getMockWeather(city);
    }

    const data = await response.json();

    return {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather?.[0]?.main || 'Unknown',
      source: 'openweathermap',
    };
  } catch (error) {
    return getMockWeather(city);
  }
};

module.exports = { getWeather };
