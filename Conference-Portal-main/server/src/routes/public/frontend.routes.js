const express = require('express');
const router = express.Router();
const {
  getAboutInfo,
  createThemeRequest,
  getCommitteeMembersFrontend,
  createCommitteeApplication,
  createContactMessage
} = require('../../controllers/public/frontend.controller');

router.get('/about-info', getAboutInfo);
router.post('/theme-requests', createThemeRequest);
router.get('/committee-members', getCommitteeMembersFrontend);
router.post('/committee-applications', createCommitteeApplication);
router.post('/contact-messages', createContactMessage);

module.exports = router;
