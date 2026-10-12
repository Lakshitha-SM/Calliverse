# 05 - Deployment Guide and Production Hosting Strategy

## 1. Deployment Topology
CalliLab is engineered for cloud-native deployment. Because academic engineering projects require flexible cost and infrastructure boundaries, three deployment strategies are documented:

1. **Option A: Containerized Cloud Deployment (Docker Compose / AWS ECS / Render / DigitalOcean)** — *Recommended for production parity.*
2. **Option B: PaaS Managed Deployment (Vercel Frontend + Render Backend + MongoDB Atlas)** — *Free-tier friendly for academic demonstration.*
3. **Option C: Dedicated Linux Virtual Machine (Ubuntu 24.04 with Nginx & PM2)** — *Self-hosted university server.*

---

## 2. Option A: Containerized Cloud Deployment (Docker Compose)

### 2.1 Target Prerequisites
- Linux Server with Docker Engine 24+ and Docker Compose v2.20+.
- Cloud DNS record pointing your domain (e.g., `callilab.example.com`) to the server IP.

### 2.2 Deployment Execution Steps
1. Clone the repository onto the remote host:
   ```bash
   git clone <REMOTE_REPOSITORY_URL> /opt/calliverse
   cd /opt/calliverse
   ```
2. Provision production environment variables:
   ```bash
   cp backend/.env.example backend/.env
   nano backend/.env
   ```
   *Provide actual secure keys for `JWT_SECRET`, `MONGO_URI`, and Cloudinary keys.*
3. Launch the container stack with automated build:
   ```bash
   docker compose up -d --build
   ```
4. Verify service health:
   ```bash
   docker compose ps
   curl -I http://localhost:80
   curl http://localhost:5000/api/health
   ```

---

## 3. Option B: Managed PaaS Deployment (Vercel + Render + Atlas)

### 3.1 Database: MongoDB Atlas
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Configure database user credentials and whitelist IP addresses (`0.0.0.0/0`).
3. Obtain the connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/calliverse?retryWrites=true&w=majority`.

### 3.2 Backend Service: Render Web Service
1. Connect repository on [Render](https://render.com).
2. Root Directory: `backend`
3. Environment: `Node`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://...`
   - `JWT_SECRET`: *(Generate strong 64-character secret)*
   - `CLIENT_URL`: *(Frontend URL, e.g., https://callilab.vercel.app)*
7. Health Check Path: `/api/health`

### 3.3 Frontend SPA: Vercel / Netlify
1. Connect repository on [Vercel](https://vercel.com).
2. Root Directory: `frontend`
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables:
   - `VITE_API_URL`: *(Render backend URL)*
7. Deploy. React Router rewrites are automatically handled.

---

## 4. Production Security Hardening Checklist
- [x] **Secret Decoupling:** All secrets isolated in `.env` and excluded from version control (`.gitignore`).
- [x] **Health Check Endpoint:** Express server exposes `/api/health` with process uptime and status.
- [x] **CORS Origin Whitelisting:** Express backend restricts origin to configured `CLIENT_URL`.
- [x] **Rate & Size Limiting:** Express payload limit capped at `10mb` to prevent memory exhaustion attacks.
- [x] **Password Salting:** All user passwords hashed via `bcryptjs` with salt round 10 before saving.
- [x] **Non-Root Execution:** Docker containers run under unprivileged user `node` rather than `root`.
