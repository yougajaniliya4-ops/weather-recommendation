const { GoogleGenerativeAI } = require('@google/generative-ai');

const isKeyConfigured = (key) => key && !key.startsWith('YOUR_') && !key.startsWith('your_');

const getMockSummary = ({ city, temperature, humidity, condition }) => {
  const tone =
    temperature > 30
      ? "It's quite warm, so stay hydrated."
      : temperature < 15
      ? "It's a bit chilly, so dress warmly."
      : 'Conditions are fairly mild.';
  return `The weather in ${city} is currently ${condition.toLowerCase()} with a temperature of ${temperature}\u00b0C and humidity at ${humidity}%. ${tone}`;
};

const getMockRecommendation = ({ temperature, condition }) => {
  const tips = [];

  if (temperature > 30) {
    tips.push('Wear light, breathable clothing.', 'Drink plenty of water.', 'Avoid strenuous outdoor activity at midday.');
  } else if (temperature < 15) {
    tips.push('Wear a jacket or layers.', 'Keep warm drinks handy.', 'Good day for indoor activities.');
  } else {
    tips.push('Comfortable weather for most outdoor activities.', 'Light layers should be enough.');
  }

  if (condition.toLowerCase().includes('rain')) {
    tips.push('Carry an umbrella or raincoat.');
  }

  return tips.join(' ');
};

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!isKeyConfigured(apiKey)) return null;
  return new GoogleGenerativeAI(apiKey);
};

const generateWeatherSummary = async ({ city, temperature, humidity, condition }) => {
  const client = getGeminiClient();
  if (!client) {
    return { summary: getMockSummary({ city, temperature, humidity, condition }), source: 'mock' };
  }

  try {
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Write a short, friendly 2-sentence weather summary for ${city}. Temperature: ${temperature}\u00b0C, Humidity: ${humidity}%, Condition: ${condition}.`;
    const result = await model.generateContent(prompt);
    return { summary: result.response.text(), source: 'gemini' };
  } catch (error) {
    return { summary: getMockSummary({ city, temperature, humidity, condition }), source: 'mock' };
  }
};

const generateWeatherRecommendation = async ({ temperature, condition }) => {
  const client = getGeminiClient();
  if (!client) {
    return { recommendation: getMockRecommendation({ temperature, condition }), source: 'mock' };
  }

  try {
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Give short, practical clothing and activity recommendations for weather that is ${condition} at ${temperature}\u00b0C. Keep it to 2-3 sentences.`;
    const result = await model.generateContent(prompt);
    return { recommendation: result.response.text(), source: 'gemini' };
  } catch (error) {
    return { recommendation: getMockRecommendation({ temperature, condition }), source: 'mock' };
  }
};

module.exports = { generateWeatherSummary, generateWeatherRecommendation };
