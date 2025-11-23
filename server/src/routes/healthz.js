// src/routes/healthz.js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log("res::",res);
  res.status(200).json({
    ok: true,
    version: '1.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;