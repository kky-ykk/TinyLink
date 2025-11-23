// src/models/Link.js
import pool from '../config/db.js';
import { validateURL } from '../utils/validateURL.js';

const Link = {
  // Validate input before DB ops
  validateInput({ url, code }) {
    if (!validateURL(url)) {
      throw new Error('Invalid URL. Must be a valid http:// or https:// URL.');
    }
    if (code) {
      if (typeof code !== 'string') {
        throw new Error('Code must be a string.');
      }
      if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
        throw new Error('Code must be 6–8 alphanumeric characters.');
      }
    }
    return true;
  },

  // Create link (with optional code)
  async create({ url, code }) {
    this.validateInput({ url, code });

    // If no code, generate until unique
    let finalCode = code;
    let attempts = 0;
    const MAX_ATTEMPTS = 10;

    while (attempts < MAX_ATTEMPTS) {
      if (!finalCode) {
        finalCode = generateCode(6); // default to 6
      }

      try {
        const res = await pool.query(
          `INSERT INTO links (code, url) 
           VALUES ($1, $2) 
           RETURNING id, code, url, clicks, last_clicked, created_at`,
          [finalCode, url]
        );
        return res.rows[0];
      } catch (err) {
        // Check for unique violation (code exists)
        if (err.code === '23505' && err.constraint === 'links_code_key') {
          if (code) {
            // Custom code provided → conflict
            throw { status: 409, message: 'Code already exists.' };
          }
          // Auto-generated → retry
          finalCode = null; // force regen
          attempts++;
        } else {
          throw err;
        }
      }
    }

    throw new Error('Failed to generate a unique short code. Please try again.');
  },

  // Find all links
  async findAll() {
    const res = await pool.query(
      `SELECT id, code, url, clicks, last_clicked, created_at 
       FROM links 
       ORDER BY created_at DESC`
    );
    return res.rows;
  },

  // Find one by code
  async findByCode(code) {
    const res = await pool.query(
      `SELECT id, code, url, clicks, last_clicked, created_at 
       FROM links 
       WHERE code = $1`,
      [code]
    );
    return res.rows[0];
  },

  // Delete by code
  async deleteByCode(code) {
    const res = await pool.query(
      `DELETE FROM links WHERE code = $1 RETURNING code`,
      [code]
    );
    return res.rowCount > 0;
  },

  // Increment click & update last_clicked
  async incrementClick(code) {
    const res = await pool.query(
      `UPDATE links 
       SET clicks = clicks + 1, last_clicked = NOW() 
       WHERE code = $1 
       RETURNING url`,
      [code]
    );
    return res.rows[0]?.url;
  }
};

export default Link;