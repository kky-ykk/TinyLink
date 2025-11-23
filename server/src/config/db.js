// src/config/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Parse DATABASE_URL safely
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('❌ DATABASE_URL is not set in .env');
}

// Force SSL for Neon (or any remote DB); allow non-SSL only for localhost dev DBs
const isLocalDev = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

const sslConfig = isLocalDev 
  ? false 
  : {
      rejectUnauthorized: true, // Neon supports full cert validation
    };

const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});

// Optional: Test connection on startup (good for debugging)
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('🔥 PostgreSQL client error:', err.stack);
});

export default pool;