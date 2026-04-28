const Theme = require('../../models/theme.model');
const Conference = require('../../models/conference.model');
const CommitteeMember = require('../../models/committeeMember.model');
const ContactMessage = require('../../models/contactMessage.model');
const CommitteeApplication = require('../../models/committeeApplication.model');
const ThemeRequest = require('../../models/themeRequest.model');

const DEFAULT_LEFT_ITEMS = [
  'Listen to experts and researchers from different domains.',
  'Discover practical innovation and real-world case studies.',
  'Connect with academics, professionals, and students.',
  'Explore future opportunities for collaboration.'
];

const DEFAULT_RIGHT_ITEMS = [
  'Attend curated sessions and interactive discussions.',
  'Learn from practical workshops and demos.',
  'Follow scientific trends impacting society and industry.',
  'Join a growing science and technology community.'
];

async function getAboutInfo(req, res) {
  try {
    const conference = await Conference.findOne({ isActive: true });
    const themes = conference
      ? await Theme.find({ conferenceId: conference._id }).sort({ displayOrder: 1 })
      : [];

    const mappedThemes = themes.map((theme) => ({
      name: theme.label,
      imageKey: 'aiImage'
    }));

    res.json({
      sponsors: ['usthb', 'blida', 'sonatrach', 'algerieTelecom', 'yassir'],
      leftItems: DEFAULT_LEFT_ITEMS,
      rightItems: DEFAULT_RIGHT_ITEMS,
      themes: mappedThemes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createThemeRequest(req, res) {
  try {
    if (!req.body.theme || !req.body.theme.trim()) {
      return res.status(400).json({ message: 'Theme is required.' });
    }

    const created = await ThemeRequest.create({ theme: req.body.theme.trim() });
    res.status(201).json({ message: 'Theme request sent successfully.', id: created._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCommitteeMembersFrontend(req, res) {
  try {
    const members = await CommitteeMember.find({ isVisible: true }).sort({ team: 1, displayOrder: 1 });
    const result = { organizing: [], scientific: [] };

    members.forEach((member) => {
      const normalized = {
        name: member.fullName,
        role: member.role,
        institution: member.affiliation
      };

      if (member.team === 'ORGANIZING') result.organizing.push(normalized);
      if (member.team === 'SCIENTIFIC') result.scientific.push(normalized);
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createCommitteeApplication(req, res) {
  try {
    const body = req.body || {};
    const created = await CommitteeApplication.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      organization: body.organization,
      position: body.position,
      expertise: body.expertise,
      yearsExperience: body.yearsExperience,
      bio: body.bio,
      motivation: body.motivation,
      organizedBefore: body.organizedBefore,
      cvFileName: body.cv ? String(body.cv.name || body.cv) : undefined
    });

    res.status(201).json({ message: 'Application submitted successfully.', id: created._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createContactMessage(req, res) {
  try {
    const created = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Message sent successfully.', id: created._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAboutInfo,
  createThemeRequest,
  getCommitteeMembersFrontend,
  createCommitteeApplication,
  createContactMessage
};
