# FulfillFlow – Order Management Web App

## Project Overview
FulfillFlow is a full-stack web application to manage customer orders efficiently. It demonstrates modern backend & frontend integration with real-time data streaming and caching.

---

## Features
- Create new orders through a clean, interactive UI.
- View all existing orders in a responsive table.
- Backend stores orders in PostgreSQL and caches them in Redis.
- Real-time order events are streamed via Redpanda (Kafka alternative).
- Environment variables managed securely with `.env`.
- Dockerized backend services for easy setup.

---

## Tech Stack
- **Frontend:** React, Axios, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database & Cache:** PostgreSQL, Redis
- **Event Streaming:** Redpanda
- **Dev Tools:** Docker, dotenv

---

## Installation & Setup

1. Clone the repository:

```bash
git clone <your-github-repo-link>
cd FulfillFlow
