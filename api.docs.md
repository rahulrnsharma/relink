# 📘 URL Shortener API Documentation

This document describes the full API specification for the URL Shortener with Analytics service.

Base URL: `http://localhost:3000`

---

## 🔗 POST `/shorten`

### ➤ Description:
Creates a shortened URL from a long URL. Optionally sets an expiry time.

### ➤ Request (JSON):
```json
{
  "longUrl": "https://example.com",
  "expiresInSeconds": 3600
}
