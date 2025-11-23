// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import LinkForm from '../components/LinkForm.jsx';
import LinkTable from '../components/LinkTable.jsx';
import { api } from '../api/api.js';
// import Header from '../components/header.jsx';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLinks = async () => {
    try {
      const data = await api.getLinks();
      setLinks(data);
    } catch (err) {
      alert(`Failed to load links: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleLinkCreated = (newLink) => {
    setLinks([newLink, ...links]);
  };

  const handleLinkDeleted = (code) => {
    setLinks(links.filter(link => link.code !== code));
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <LinkForm onLinkCreated={handleLinkCreated} />
        
        {loading ? (
          <div style={styles.loading}>Loading links…</div>
        ) : (
          <LinkTable links={links} onLinkDeleted={handleLinkDeleted} />
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '1rem'
  },
  main: {
    marginTop: '1rem'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#4a5568'
  }
};