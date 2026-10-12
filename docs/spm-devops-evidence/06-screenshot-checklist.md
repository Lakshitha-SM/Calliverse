# 06 - Screenshot Evidence Checklist for SPM Report

This document specifies the exact screenshots required for **Appendix K: DevOps, Testing & CI/CD Evidence** of your SPM Project Report. Each item provides the tool to open, navigation steps, exact region to capture, figure caption, and academic explanation.

---

## 1. Screenshot Matrix Overview

| Appendix ID | Title / Artifact | Primary Tool / Context | Caption |
| :--- | :--- | :--- | :--- |
| **Figure K.1** | Source Code Repository Structure | VS Code / Git Terminal | *Repository Tree, Git Status, and Conventional Commit History* |
| **Figure K.2** | Automated Testing Execution | Terminal / PowerShell | *Automated Backend Unit Tests and AI Assessment Validation* |
| **Figure K.3** | Frontend Static Analysis & Build | Terminal / PowerShell | *ESLint Static Analysis and Vite 8 Production Asset Compilation* |
| **Figure K.4** | Docker Containerization Validation | Terminal / PowerShell | *Docker Compose Orchestration and Multi-Stage Build Configuration* |
| **Figure K.5** | CI/CD Pipeline Workflow | GitHub Repository Actions / IDE | *GitHub Actions CI/CD Pipeline Workflow and Automation Configuration* |
| **Figure K.6** | Backend API Health Probe | Web Browser / Postman | *Runtime Application Health Status Probe (`/api/health`)* |

---

## 2. Step-by-Step Screenshot Capture Guide

### Figure K.1: Source Code Repository Structure and Version Control
- **Tool to Open:** VS Code or Terminal inside `CalliVerse`.
- **Navigation / Command:**
  Open terminal in project root and execute:
  ```powershell
  git status
  git log -n 4 --oneline
  ```
- **Section to Capture:**
  The terminal output showing branch `master`, clean working tree with `.gitignore` exclusions active, and the commit history (`feat(phase-1)`, `feat(phase-2)`, `feat(phase-3)`).
- **Academic Caption:**  
  *Figure K.1: Git Version Control State, Branch Management, and Commit History for CalliLab Repository.*
- **What it Demonstrates:**  
  Demonstrates disciplined version control practices, exclusion of sensitive `.env` files, and conventional commit adherence.

---

### Figure K.2: Automated Backend Testing & CalliVision AI Engine Validation
- **Tool to Open:** Terminal in `CalliVerse/backend`.
- **Navigation / Command:**
  ```powershell
  cd "c:\Users\Lakshitha SM\Desktop\CalliVerse\backend"
  npm test
  ```
- **Section to Capture:**
  The TAP test report showing:
  - `ok 1 - CalliVision AI Assessment Engine Tests (4 tests passed)`
  - `ok 2 - CalliLab Backend Module and Route Integrity Tests (3 tests passed)`
  - Summary: `# tests 7, # pass 7, # fail 0`
- **Academic Caption:**  
  *Figure K.2: Automated Unit Testing Results for CalliVision v2.4 AI Assessment Engine and REST Controller Integrity.*
- **What it Demonstrates:**  
  Demonstrates test-driven quality assurance, deterministic verification of geometric scoring metrics, and controller export integrity.

---

### Figure K.3: Frontend Static Code Analysis & Production Build
- **Tool to Open:** Terminal in `CalliVerse/frontend`.
- **Navigation / Command:**
  ```powershell
  cd "c:\Users\Lakshitha SM\Desktop\CalliVerse\frontend"
  npm run lint
  npm test
  npm run build
  ```
- **Section to Capture:**
  The terminal window showing ESLint passing (`0 errors`), SkillRadar unit tests passing (`4 passed`), and Vite 8 compiling 1,830 modules into `/dist` in ~2.1s.
- **Academic Caption:**  
  *Figure K.3: Static Code Analysis (ESLint), Component Geometry Tests, and Vite Production Bundle Output.*
- **What it Demonstrates:**  
  Verifies code style conformance, React hook purity, mathematical correctness of the SkillRadar visualization, and production asset minification.

---

### Figure K.4: Docker Multi-Container Compose Configuration Validation
- **Tool to Open:** Terminal in project root `CalliVerse`.
- **Navigation / Command:**
  ```powershell
  cd "c:\Users\Lakshitha SM\Desktop\CalliVerse"
  docker compose config
  ```
- **Section to Capture:**
  The terminal output displaying the resolved YAML configuration for `mongodb`, `backend`, and `frontend` services, bridge networks, and volumes.
- **Academic Caption:**  
  *Figure K.4: Docker Compose Multi-Container Orchestration Specification and Syntax Validation.*
- **What it Demonstrates:**  
  Demonstrates microservice containerization readiness, health check probe integration, and persistent database volume mapping.

---

### Figure K.5: GitHub Actions CI/CD Pipeline Workflow
- **Tool to Open:**
  - **Local Evidence:** Open `.github/workflows/ci.yml` in VS Code.
  - **Remote Evidence (if pushed to GitHub):** Open GitHub web browser -> Navigate to repository -> Click **Actions** tab -> Select `CalliLab CI/CD Pipeline`.
- **Section to Capture:**
  The 3-stage pipeline visualization showing `test-and-build`, `docker-validation`, and `deployment-check`.
- **Academic Caption:**  
  *Figure K.5: GitHub Actions Continuous Integration and Deployment (CI/CD) Workflow Specification.*
- **What it Demonstrates:**  
  Proves automated build and test orchestration across Node.js matrix versions and container validation.

---

### Figure K.6: Application Health and Uptime Monitoring Probe
- **Tool to Open:** Web Browser (Chrome/Edge).
- **Navigation:**
  Start backend server (`npm start` in `backend`), then navigate to:
  `http://localhost:5000/api/health`
- **Section to Capture:**
  The browser window displaying JSON payload:
  ```json
  {
    "status": "healthy",
    "service": "CalliVerse API",
    "uptime": 45,
    "timestamp": "2026-10-12T10:00:00.000Z",
    "environment": "development"
  }
  ```
- **Academic Caption:**  
  *Figure K.6: CalliLab REST API Health Probe Endpoint Displaying Service Status and Telemetry.*
- **What it Demonstrates:**  
  Demonstrates operational monitoring, heartbeat checks for container orchestration, and uptime tracking.
