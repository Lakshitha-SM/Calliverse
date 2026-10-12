# CalliLab — AI-Powered Calligraphy Skill Development & Assessment Platform

> **Final-Year Academic Engineering Project & SPM Report Implementation**  
> **Technologies:** React 19, Vite 8, Tailwind CSS v4, Fabric.js (HTML5 Canvas), Node.js 22, Express.js 5, MongoDB / Mongoose 9, CalliVision v2.4 Engine, Docker, GitHub Actions CI/CD.

---

## 1. Project Overview

**CalliLab** (CalliVerse) is an end-to-end, full-stack educational and automated assessment platform designed to preserve and accelerate classical calligraphy skills (Copperplate, Gothic / Blackletter, Spencerian, and Modern Brush scripts).

### Key Architectural Modules
1. **Interactive Practice Lab & Digital Canvas:** Low-latency HTML5 Canvas driven by Fabric.js with velocity-to-pressure curve mapping, 55° diagonal guidelines, ascender/descender grids, audio haptic feedback, and master stroke split-view comparison slider.
2. **CalliVision v2.4 AI Assessment Engine:** Algorithmic multi-metric geometric evaluation of handwriting:
   - Letter Shape & Contour Uniformity
   - Stroke Consistency (downstroke vs. upstroke thickness ratio)
   - Optical Spacing & Inter-character Rhythm
   - Horizontal Baseline Drift (pixels)
   - Slant Angle Adherence (55° standard guideline)
   - Stroke Smoothness & Micro-jitter Detection
3. **AI Virtual Calligraphy Coach:** Automated diagnostic evaluation synthesizing past attempts into targeted weakness identification and prescribed remedial drills.
4. **Structured Curriculum & Learning Paths:** Course syllabus tree, multimedia lesson players, and printable practice sheet generator.
5. **Gamification & Social Gallery:** Daily calligraphy drills, community peer-critique gallery, personal portfolio, and cryptographically stamped completion certificates.
6. **Role-Based Access Control (RBAC):** Dedicated portals for Learners, Mentors (stroke annotations and qualitative critiques), and System Administrators.

---

## 2. Repository Structure

```
CalliVerse/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI/CD pipeline
├── backend/
│   ├── config/                  # Database (db.js), CDN (cloudinary.js), uploads (upload.js)
│   ├── controllers/             # Auth, Assessment, Practice, Coach, Course, Community controllers
│   ├── middleware/              # JWT auth & RBAC authorization middleware
│   ├── models/                  # Mongoose models (User, Course, PracticeAttempt, AIAssessment, etc.)
│   ├── routes/                  # Express REST API routes
│   ├── services/                # CalliVision v2.4 algorithmic assessment engine
│   ├── tests/                   # Native Node.js unit and integration tests
│   ├── .env.example             # Sanitized environment configuration template
│   ├── Dockerfile               # Multi-stage production container build
│   └── server.js                # Express application entry point & health check
├── frontend/
│   ├── public/                  # Static assets and guide templates
│   ├── src/
│   │   ├── components/          # Common UI widgets (SkillRadar, ImageCompareSlider, InkStroke)
│   │   ├── context/             # AuthContext, ThemeContext
│   │   ├── pages/               # Practice Lab, Canvas, Coach, Courses, Mentor, Admin, etc.
│   │   ├── App.jsx              # React Router v7 routes and route guards
│   │   └── main.jsx             # React 19 application bootstrapping
│   ├── tests/                   # Frontend mathematical/geometry unit tests
│   ├── Dockerfile               # Multi-stage build (Node builder -> Nginx runtime)
│   ├── nginx.conf               # SPA routing & API reverse proxy configuration
│   └── vite.config.js           # Vite 8 build configuration with Tailwind CSS v4
├── docs/
│   └── spm-devops-evidence/     # Academic SPM report evidence and documentation
├── docker-compose.yml           # Multi-container orchestration (MongoDB + Backend + Frontend)
├── .dockerignore                # Container build exclusions
└── .gitignore                   # Version control security and artifact exclusions
```

---

## 3. Prerequisites

- **Node.js:** v20.x or v22.x LTS (v22.13.0 verified)
- **npm:** v10.x or higher
- **MongoDB:** v6.x or v7.x (local instance or cloud MongoDB Atlas URI)
- **Docker & Docker Compose:** (Optional, for containerized execution)

---

## 4. Local Development Setup

### 4.1 Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env to set your MONGO_URI and JWT_SECRET

# Start development server
npm run dev
# The API will start on http://localhost:5000
# Health check available at: http://localhost:5000/api/health
```

### 4.2 Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
# The client will start on http://localhost:5173
```

---

## 5. Automated Testing & Verification

The project includes automated test suites executed via the native Node.js test runner (`node:test`) and ESLint static code analysis.

### Running Backend Tests
```bash
cd backend
npm test
```
*Executes CalliVision AI assessment engine tests and backend module/route integrity validations.*

### Running Frontend Tests & Linting
```bash
cd frontend
# Run static code analysis
npm run lint

# Run unit tests (SkillRadar geometry & coordinate models)
npm test

# Verify production bundle compilation
npm run build
```

---

## 6. Docker Containerization & Orchestration

The application can be started using Docker Compose with zero manual configuration.

```bash
# Build and run all microservices in the background
docker compose up --build -d

# Check running container health
docker compose ps

# View service logs
docker compose logs -f

# Gracefully stop services
docker compose down
```

### Exposed Endpoints in Docker Mode
- **Frontend SPA (Nginx):** `http://localhost:80`
- **Backend API:** `http://localhost:5000`
- **MongoDB Database:** `localhost:27017`

---

## 7. CI/CD Pipeline (GitHub Actions)

The continuous integration pipeline is defined in `.github/workflows/ci.yml` and executes on every push or pull request to `master` and `main`:

1. **Stage 1: Code Quality, Tests & Builds**
   - Matrix testing on Node.js 20.x and 22.x
   - Dependency verification (`npm ci`)
   - Backend unit tests (`npm test` in `backend`)
   - Frontend static linting (`npm run lint` in `frontend`)
   - Frontend unit tests (`npm test` in `frontend`)
   - Vite production compilation (`npm run build` in `frontend`)
   - Dependency vulnerability review (`npm audit`)
2. **Stage 2: Container Validation**
   - Docker Buildx multi-stage image verification for `callilab-backend` and `callilab-frontend`
3. **Stage 3: Deployment Readiness Verification**
   - Configuration audit for Docker Compose and environment templates

---

## 8. License & Academic Attribution

This project is developed by **Lakshitha SM** as a Final-Year Engineering SPM Project. All rights reserved.
