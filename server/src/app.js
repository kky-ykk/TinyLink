// src/app.js
import express from 'express';
import cors from 'cors'; // optional, but helpful for local dev
import healthzRouter from './routes/healthz.js';
import redirectRouter from './routes/redirect.js';
import linksRouter from './routes/api/links.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Routes
app.use('/healthz', healthzRouter);
app.use('/api/links', linksRouter);
app.use('/', redirectRouter); // MUST be last (catch-all for /:code)

export default app;