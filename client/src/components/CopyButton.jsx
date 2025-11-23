// src/components/CopyButton.jsx
import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={styles.button}
      title={copied ? 'Copied!' : `Copy ${label}`}
    >
      {copied ? '✓ Copied' : `📋 ${label}`}
    </button>
  );
}

const styles = {
  button: {
    background: '#edf2f7',
    border: '1px solid #cbd5e0',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  }
};