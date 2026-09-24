const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
