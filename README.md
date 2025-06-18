# 🔗 URL Shortener with Analytics

A scalable URL shortener API (like Bit.ly) built with Node.js, PostgreSQL, and Redis.  
Supports redirect tracking, analytics, rate limiting, expiry, and Redis caching.

---

## 🛠 Tech Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Cache:** Redis
- **ORM:** Sequelize
- **Containerized:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rahulrnsharma/relink.git
cd relink
```

### 2. Create .env file

```bash
cp .env
## DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
## BASE_URL=http://localhost:3000
## REDIS_URL=redis://redis:6379
```

3. Run the project
```bash
docker-compose up --build
```

