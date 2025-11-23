// src/routes/redirect.js
import { Router } from 'express';
import Link from '../models/Link.js';

const router = Router();

router.get('/:code', async (req, res) => {
  const { code } = req.params;

  // First, increment click and get URL
  const url = await Link.incrementClick(code);

  if (!url) {
    return res.status(404).send('Not Found');
  }

  res.redirect(302, url);
});

export default router;