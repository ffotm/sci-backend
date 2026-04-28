const mongoose = require('mongoose');

const committeeApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 150 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
    phone: { type: String, trim: true, maxlength: 50 },
    organization: { type: String, required: true, trim: true, maxlength: 200 },
    position: { type: String, required: true, trim: true, maxlength: 120 },
    expertise: { type: String, required: true, trim: true, maxlength: 300 },
    yearsExperience: { type: String, trim: true, maxlength: 50 },
    bio: { type: String, required: true, trim: true, maxlength: 3000 },
    motivation: { type: String, required: true, trim: true, maxlength: 3000 },
    organizedBefore: { type: String, trim: true, maxlength: 20 },
    cvFileName: { type: String, trim: true, maxlength: 260 },
    status: { type: String, enum: ['PENDING', 'REVIEWED'], default: 'PENDING' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CommitteeApplication', committeeApplicationSchema);
