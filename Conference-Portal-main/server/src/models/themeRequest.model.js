const mongoose = require('mongoose');

const themeRequestSchema = new mongoose.Schema(
  {
    theme: { type: String, required: true, trim: true, maxlength: 200 },
    status: { type: String, enum: ['NEW', 'REVIEWED'], default: 'NEW' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ThemeRequest', themeRequestSchema);
