// src/components/LinkForm.jsx
import { useState } from 'react';
import { api } from '../api/api.js';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function LinkForm({ onLinkCreated }) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return setError('URL is required.');

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const link = await api.createLink({ url, code: code.trim() || undefined });
      setSuccess(`Link created! ${API_BASE}/${link.code}`);
      onLinkCreated(link);
      setUrl('');
      setCode('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Long URL *</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/path"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Custom Code (optional)</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g., docs"
          style={styles.input}
          maxLength="8"
        />
        <p style={styles.hint}>6–8 alphanumeric characters. Leave blank for auto-generate.</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Creating…' : 'Shorten URL'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.25rem',
    fontWeight: '600',
    color: '#2d3748'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #cbd5e0',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  hint: {
    fontSize: '0.85rem',
    color: '#718096',
    marginTop: '0.25rem'
  },
  error: {
    color: '#e53e3e',
    marginBottom: '0.75rem',
    padding: '0.5rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px'
  },
  success: {
    color: '#38a169',
    marginBottom: '0.75rem',
    padding: '0.5rem',
    backgroundColor: '#e6fffa',
    borderRadius: '4px'
  },
  button: {
    background: '#3182ce',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};