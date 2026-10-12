# 01 - Repository Structure and Source Code Organization

## 1. Executive Summary
**Project Name:** CalliLab – AI-Powered Calligraphy Skill Development and Assessment Platform (CalliVerse)  
**Architecture:** Monorepo containing decoupled Frontend Single Page Application (SPA), Backend RESTful API Microservice, algorithmic assessment engine, and containerized orchestration.  
**Version Control:** Git version 2.48+ (Local branch `master` tracking development milestones).

---

## 2. Directory Hierarchy

```
CalliVerse/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Multi-stage GitHub Actions CI/CD Pipeline
├── backend/                           # Node.js / Express.js REST API Microservice
│   ├── config/
│   │   ├── cloudinary.js              # Cloudinary media storage SDK configuration
│   │   ├── db.js                      # MongoDB connection pool & event listeners
│   │   ├── seedLearningData.js        # Calligraphy curriculum seed records
│   │   └── upload.js                  # Multer multipart file upload engine
│   ├── controllers/
│   │   ├── assessmentController.js    # AI assessment execution & score persistence
│   │   ├── authController.js          # Authentication, token generation, demo accounts
│   │   ├── coachController.js         # AI Calligraphy Coach diagnostic advice
│   │   ├── communityController.js     # Public critique feed, comments, likes
│   │   ├── courseController.js        # Syllabus catalog, difficulty filtering, enrollment
│   │   ├── designController.js        # User artwork canvas state CRUD
│   │   ├── exerciseController.js      # Guideline vectors and exercise targets
│   │   ├── lessonController.js        # Modular lesson video and markdown content
│   │   ├── practiceController.js      # Canvas attempt submissions & history
│   │   ├── progressController.js      # Cumulative analytics, XP, streaks
│   │   └── recommendController.js     # Dynamic weak-skill recommendation engine
│   ├── middleware/
│   │   └── authMiddleware.js          # JWT Bearer token verification & RBAC gates
│   ├── models/
│   │   ├── AIAssessment.js            # Evaluated metric scores & qualitative feedback
│   │   ├── Course.js                  # Course syllabus schema
│   │   ├── Design.js                  # Canvas artwork vector state
│   │   ├── Exercise.js                # Guideline and target stroke parameters
│   │   ├── Lesson.js                  # Modular syllabus lessons
│   │   ├── Post.js                    # Community showcase artwork posts
│   │   ├── PracticeAttempt.js         # Individual student canvas attempts
│   │   ├── Progress.js                # Longitudinal student learning telemetry
│   │   └── User.js                    # User account schema with Bcrypt hashing
│   ├── routes/                        # Express API route declarations
│   ├── services/
│   │   └── aiAssessmentEngine.js      # CalliVision v2.4 multi-metric assessment pipeline
│   ├── tests/
│   │   ├── aiAssessment.test.js       # CalliVision AI engine unit test suite
│   │   └── healthAndRoutes.test.js    # Controller export and schema integrity tests
│   ├── .env.example                   # Sanitized environment configuration template
│   ├── Dockerfile                     # Multi-stage production container build
│   ├── package.json                   # Backend dependencies and execution scripts
│   └── server.js                      # Express server entry point & /api/health probe
├── frontend/                          # React 19 + Vite 8 SPA Client
│   ├── public/                        # Static assets, calligraphy guideline images
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                # SkillRadar, ImageCompareSlider, InkStroke
│   │   │   └── layout/                # DashboardLayout, brand header, sidebar
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # JWT session persistence & role switching
│   │   │   └── ThemeContext.jsx       # Dark/light theme state provider
│   │   ├── pages/
│   │   │   ├── Admin/                 # AdminConsole.jsx (telemetry & user moderation)
│   │   │   ├── Auth/                  # Login.jsx, Signup.jsx
│   │   │   ├── Courses/               # CoursesCatalog.jsx, CourseDetail.jsx, LessonView.jsx
│   │   │   ├── Mentor/                # MentorStudio.jsx (stroke annotation & grading)
│   │   │   ├── Canvas.jsx             # Freeform creative calligraphy studio
│   │   │   ├── Certificate.jsx        # Verifiable course completion certificate generator
│   │   │   ├── Challenges.jsx         # Gamified daily stroke drills
│   │   │   ├── Coach.jsx              # AI Calligraphy Coach diagnosis station
│   │   │   ├── Community.jsx          # Public artwork gallery
│   │   │   ├── Dashboard.jsx          # Student overview & active course widgets
│   │   │   ├── FontPreview.jsx        # Typographic glyph inspection
│   │   │   ├── Landing.jsx            # Platform landing page
│   │   │   ├── Onboarding.jsx         # Skill calibration questionnaire
│   │   │   ├── Portfolio.jsx          # Student artwork portfolio
│   │   │   ├── Practice.jsx           # Flagship interactive Practice Lab (Fabric.js)
│   │   │   ├── Profile.jsx            # User profile & badge shelf
│   │   │   ├── Progress.jsx           # Analytics, streaks, radar charts
│   │   │   ├── QRArtwork.jsx          # Calligraphic QR art generator
│   │   │   └── Templates.jsx          # Printable practice guideline sheets
│   │   ├── App.jsx                    # React Router v7 routes & private route guards
│   │   ├── index.css                  # Tailwind CSS v4 design system
│   │   └── main.jsx                   # React root bootstrapping
│   ├── tests/
│   │   └── skillRadar.test.js         # SkillRadar coordinate & polygon geometry tests
│   ├── Dockerfile                     # Multi-stage Node builder -> Nginx runtime build
│   ├── eslint.config.js               # ESLint static analysis configuration
│   ├── nginx.conf                     # Production SPA routing & API reverse proxy
│   ├── package.json                   # Frontend dependencies and scripts
│   └── vite.config.js                 # Vite 8 build configuration
├── docs/
│   └── spm-devops-evidence/           # Academic SPM report evidence and documentation
├── docker-compose.yml                 # Multi-container orchestration (MongoDB + API + SPA)
├── .dockerignore                      # Docker build artifact exclusion list
├── .gitignore                         # Git repository secret & dependency exclusion list
└── README.md                          # Comprehensive project technical documentation
```

---

## 3. Technology Stack & Role Matrix

| Layer | Technology | Version | Purpose in CalliLab |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.2.6` | Declarative UI rendering and interactive state management. |
| **Frontend Bundler** | Vite | `^8.0.12` | Lightning-fast HMR and Rollup production bundling. |
| **Styling & Design System** | Tailwind CSS | `^4.3.0` | Utility-first responsive CSS styling with custom CSS properties. |
| **Interactive Canvas** | Fabric.js | `^7.4.0` | Low-latency vector stroke physics, smoothing, and guideline rendering. |
| **Backend Runtime** | Node.js | `v22.13.0` | Asynchronous, event-driven JavaScript server execution. |
| **Web Framework** | Express.js | `^5.2.1` | RESTful routing, middleware pipelines, and API controller dispatching. |
| **Database** | MongoDB / Mongoose | `^9.6.2` | Document data persistence, indexing, and schema validation. |
| **Authentication** | JWT & Bcrypt | `9.0.3` / `3.0.3` | Salted password hashing and stateless authorization tokens. |
| **AI Assessment** | CalliVision v2.4 | Internal Engine | Deterministic multi-metric geometric evaluation of handwriting contours. |
| **Containerization** | Docker & Compose | `28.1.1` / `v2.35.1` | Multi-stage image packaging and local container orchestration. |
| **CI/CD Platform** | GitHub Actions | Standard V4 | Continuous Integration for automated linting, testing, and building. |
| **Web Server** | Nginx | `1.27-alpine` | High-concurrency static asset serving and API reverse proxying. |

---

## 4. Git Version Control State
- **Branch:** `master`
- **History Status:** Clean working tree with conventional commits tracking major feature milestones (`feat(phase-1)`, `feat(phase-2)`, `feat(phase-3)`).
- **Security Posture:** `.gitignore` excludes `.env`, `backend/.env`, dependency folders, and build bundles. Sensitive production variables are isolated in `.env.example`.
