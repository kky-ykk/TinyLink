// src/components/Header.jsx
export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>TinyLink</h1>
      <p style={styles.subtitle}>A simple URL shortener</p>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem 1rem',
    textAlign: 'center',
    borderBottom: '1px solid #eaeaea'
  },
  title: {
    fontSize: '2rem',
    margin: '0',
    color: '#2d3748'
  },
  subtitle: {
    margin: '0.5rem 0 0',
    color: '#718096',
    fontSize: '1rem'
  }
};