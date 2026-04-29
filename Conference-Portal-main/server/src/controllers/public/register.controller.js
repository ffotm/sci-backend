const { registerParticipant } = require('../../services/registration.service');
const Conference = require('../../models/conference.model');

async function register(req, res) {
  try {
    console.log('📝 Register request body:', req.body);

    // Allow registration without an active conference (just create participant account)
    let conference = null;
    if (req.body.conferenceId) {
      conference = await Conference.findById(req.body.conferenceId);
      if (!conference) {
        return res.status(404).json({ message: 'Conference not found.' });
      }
    } else {
      // If no conferenceId provided, try to find active conference
      conference = await Conference.findOne({ isActive: true });
    }

    console.log('🔍 Conference:', conference ? conference._id : 'none');

    const result = await registerParticipant(req.body, conference ? conference._id : null);

    console.log('✅ Registration successful:', result.participant._id);

    res.json({
      registrationId: result.registration ? result.registration.registrationId : null,
      participantId: result.participant._id,
      alreadyRegistered: result.alreadyRegistered,
      message: conference
        ? (result.alreadyRegistered ? 'Already registered for this conference' : 'Successfully registered for the conference')
        : 'Account created successfully. You can now register for conferences.'
    });
  } catch (error) {
    console.error('❌ Register error:', error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { register };
