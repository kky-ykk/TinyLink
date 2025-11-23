// src/api/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
console.log("url::",API_BASE);
export const api = {
  // GET /api/links
  async getLinks() {
    const res = await fetch(`${API_BASE}/api/links`);
    if (!res.ok) throw new Error(`Failed to fetch links: ${res.status}`);
    return res.json();
  },

  // POST /api/links
  async createLink({ url, code }) {
    const res = await fetch(`${API_BASE}/api/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, code: code || undefined })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json(); // raw link (spec-compliant)
  },

  // DELETE /api/links/:code
  async deleteLink(code) {
    const res = await fetch(`${API_BASE}/api/links/${code}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error('Link not found.');
      throw new Error(`Failed to delete link: ${res.status}`);
    }
    // 204 → no body
  },

  // GET /api/links/:code (for stats page)
  async getLink(code) {
    const res = await fetch(`${API_BASE}/api/links/${code}`);
    if (!res.ok) {
      if (res.status === 404) throw new Error('Link not found.');
      throw new Error(`Failed to fetch link: ${res.status}`);
    }
    return res.json(); // raw object
  }
};