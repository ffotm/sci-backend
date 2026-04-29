const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const fetchJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || data.error || "API request failed");
  }

  return data;
};

export const request = fetchJson;

export const backendServices = {
  getSpeakers: () => fetchJson("/api/speakers"),
  createSpeaker: (body) => fetchJson("/api/speakers", { method: "POST", body: JSON.stringify(body) }),
  updateSpeaker: (id, body) => fetchJson(`/api/speakers/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteSpeaker: (id) => fetchJson(`/api/speakers/${id}`, { method: "DELETE" }),
  getSpeakerByEmail: (email) => fetchJson(`/api/speakers/${email}`),

  submitPaper: (body) => fetchJson("/api/submit-paper", { method: "POST", body: JSON.stringify(body) }),
  submitTalk: (body) => fetchJson("/api/talks", { method: "POST", body: JSON.stringify(body) }),
  trackPaper: (email) => fetchJson(`/api/track-paper/${email}`),
  getSubmissions: () => fetchJson("/api/submissions"),
  updateSubmission: (id, body) => fetchJson(`/api/submissions/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  registerParticipant: (body) => fetchJson("/api/register", { method: "POST", body: JSON.stringify(body) }),
  applyCommittee: (body) => fetchJson("/api/committee-applications", { method: "POST", body: JSON.stringify(body) }),
  getRegistrations: (query = "") => fetchJson(`/api/registrations${query ? `?${query}` : ""}`),
  updateRegistration: (id, body) => fetchJson(`/api/registrations/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  getCommitteeMembers: () => fetchJson("/api/committee-members"),
  getAboutInfo: () => fetchJson("/api/about-info"),

  speakerRegister: (body) => fetchJson("/api/speaker-register", { method: "POST", body: JSON.stringify(body) }),
  speakerLogin: (body) => fetchJson("/api/speaker-login", { method: "POST", body: JSON.stringify(body) }),
  getSpeakerProfile: (email) => fetchJson(`/api/speaker-profile/${email}`),
  updateSpeakerProfile: (email, body) => fetchJson(`/api/speaker-profile/${email}`, { method: "PUT", body: JSON.stringify(body) }),

  getAgenda: () => fetchJson("/api/agenda"),
  createAgendaItem: (body) => fetchJson("/api/agenda", { method: "POST", body: JSON.stringify(body) }),
  updateAgendaItem: (id, body) => fetchJson(`/api/agenda/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteAgendaItem: (id) => fetchJson(`/api/agenda/${id}`, { method: "DELETE" }),

  getContactMessages: () => fetchJson("/api/contact-messages"),
  sendContactMessage: (body) => fetchJson("/api/contact-messages", { method: "POST", body: JSON.stringify(body) }),
  updateContactMessage: (id, body) => fetchJson(`/api/contact-messages/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteContactMessage: (id) => fetchJson(`/api/contact-messages/${id}`, { method: "DELETE" }),
};
