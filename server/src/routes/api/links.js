// src/routes/api/links.js
import { Router } from 'express';
import Link from '../../models/Link.js';

const router = Router();

// GET /api/links → list all
router.get('/', async (req, res) => {
  try {
    const links = await Link.findAll();
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/links → create
router.post('/', async (req, res) => {
  const { url, code } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  try {
    const link = await Link.create({ url, code });
    res.status(201).json(link);
  } catch (err) {
    if (err.status === 409) {
      return res.status(409).json({ error: err.message });
    }
    if (err.message.includes('Invalid URL') || err.message.includes('Code must be')) {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create link.' });
  }
});

// GET /api/links/:code → stats
router.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findByCode(code);
    if (!link) {
      return res.status(404).json({ error: 'Link not found.' });
    }
    res.json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/links/:code
router.delete('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const deleted = await Link.deleteByCode(code);
    if (!deleted) {
      return res.status(404).json({ error: 'Link not found.' });
    }
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete link.' });
  }
});

export default router;