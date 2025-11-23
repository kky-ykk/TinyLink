// src/components/LinkTable.jsx
import { useState } from 'react';
import CopyButton from './CopyButton.jsx';
import { api } from '../api/api.js';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function LinkTable({ links, onLinkDeleted }) {
  const [deleting, setDeleting] = useState(new Set());

  const handleDelete = async (code) => {
    if (!window.confirm(`Delete link "${code}"? This cannot be undone.`)) return;

    setDeleting(prev => new Set(prev).add(code));
    try {
      await api.deleteLink(code);
      onLinkDeleted(code);
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeleting(prev => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }
  };

  if (links.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No links yet. Create one above.</p>
      </div>
    );
  }

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>
                <code style={styles.code}>{link.code}</code>
                <CopyButton text={`${API_BASE}/${link.code}`} label="URL" />
              </td>
              <td>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.url}
                >
                  {truncateUrl(link.url)}
                </a>
                <CopyButton text={link.url} label="Target" />
              </td>
              <td>{link.clicks}</td>
              <td>
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleString()
                  : '—'}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(link.code)}
                  disabled={deleting.has(link.code)}
                  style={{
                    ...styles.deleteButton,
                    opacity: deleting.has(link.code) ? 0.6 : 1
                  }}
                >
                  {deleting.has(link.code) ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function truncateUrl(url, maxLength = 40) {
  if (url.length <= maxLength) return url;
  return url.slice(0, maxLength - 3) + '...';
}

const styles = {
  empty: {
    textAlign: 'center',
    padding: '2rem',
    color: '#718096',
    fontStyle: 'italic'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem'
  },
  code: {
    display: 'block',
    marginBottom: '0.25rem'
  },
  url: {
    color: '#3182ce',
    textDecoration: 'none'
  },
  deleteButton: {
    background: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  }
};