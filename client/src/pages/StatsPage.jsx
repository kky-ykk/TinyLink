// src/pages/StatsPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Header from '../components/Header.jsx';
import { api } from '../api/api.js';
import Header from '../components/Header.jsx';

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const data = await api.getLink(code);
        setLink(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [code]);

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.main}>Loading stats for "{code}"…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.main}>
          <div style={styles.error}>❌ {error}</div>
          <a href="/" style={styles.link}>← Back to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <h2 style={styles.title}>Stats for <code>{link.code}</code></h2>
        <div style={styles.card}>
          <div><strong>Short URL:</strong> <a href={`/${link.code}`} target="_blank" rel="noopener">{window.location.origin}/{link.code}</a></div>
          <div><strong>Target URL:</strong> <a href={link.url} target="_blank" rel="noopener">{link.url}</a></div>
          <div><strong>Total Clicks:</strong> {link.clicks}</div>
          <div><strong>Last Clicked:</strong> {link.last_clicked 
            ? new Date(link.last_clicked).toLocaleString() 
            : 'Never'}</div>
          <div><strong>Created At:</strong> {new Date(link.created_at).toLocaleString()}</div>
        </div>
        <a href="/" style={styles.link}>← Back to Dashboard</a>
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '1rem'
  },
  main: {
    marginTop: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
    lineHeight: 1.6
  },
  error: {
    color: '#e53e3e',
    padding: '1rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    textAlign: 'center'
  },
  link: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#3182ce',
    textDecoration: 'none'
  }
};