# TinyLink — A URL Shortener

A minimal, performant URL shortening service (like Bitly), built with React, Node.js, Express, and PostgreSQL.

🔗 **Live Demo**: https://tinylink-4-ebnq.onrender.com

---

## ✅ Features

- Shorten any valid HTTP/HTTPS URL
- Optional custom short codes (6–8 alphanumeric chars)
- Real-time click tracking & last-click timestamp
- Dashboard to view, copy, and delete links
- Dedicated stats page per short code (`/code/:code`)
- Health check endpoint (`GET /healthz`)

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + plain CSS  
- **Backend**: Node.js + Express  
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech))  
- **Hosting**:  
  - Frontend & Backend: [Render](https://render.com)  
  - DB: Neon (free tier)

---

## 📦 Environment Variables

See `.env.example`:

```env
# Backend (.env)
PORT=5000
DATABASE_URL=postgresql://...

# Frontend (.env)
VITE_API_BASE=https://tinylink-4-ebnq.onrender.com
