const Location = require('../models/Location');

const addLocation = async (req, res) => {
  try {
    const { city, country } = req.body;
    if (!city || !country) {
      return res.status(400).json({ success: false, message: 'Please provide city and country' });
    }
    const location = await Location.create({ city, country, user: req.user._id });
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ _id: req.params.id, user: req.user._id });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    location.city = req.body.city || location.city;
    location.country = req.body.country || location.country;
    await location.save();
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addLocation, getLocations, updateLocation, deleteLocation };
