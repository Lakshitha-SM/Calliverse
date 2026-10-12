# 07 - End-to-End DevOps Lifecycle and Pipeline Architecture

This document diagrams the complete DevOps lifecycle implemented for CalliLab, from developer commit to automated validation, container packaging, and production operations.

---

## 1. End-to-End DevOps Lifecycle Flowchart

```mermaid
flowchart TD
    %% Developer Workspace
    subgraph DEV [1. Developer Workspace]
        Code[Write Feature / Bugfix] --> GitAdd[Stage Changes: git add]
        GitAdd --> GitCommit[Commit: git commit with conventional format]
        GitCommit --> LocalVal[Run Local Pre-flight: npm test & npm run lint]
    end

    %% Version Control & Remote
    subgraph VCS [2. Version Control & Trigger]
        LocalVal --> GitPush[Push to Remote Repository: git push origin master]
        GitPush --> Webhook[GitHub Webhook Trigger]
    end

    %% GitHub Actions CI Pipeline
    subgraph CI [3. GitHub Actions Continuous Integration]
        Webhook --> Job1[Job 1: Code Quality, Tests & Builds]
        
        subgraph Stage1 [Stage 1 Details]
            Job1 --> CoCode[Checkout Repository]
            CoCode --> NodeSetup[Setup Node.js 20 & 22 Matrix]
            NodeSetup --> DepInstall[Clean Install: npm ci]
            DepInstall --> BE_Test[Backend Tests: npm test 7 passing]
            DepInstall --> FE_Lint[Frontend Lint: eslint 0 errors]
            DepInstall --> FE_Test[Frontend Tests: node:test 4 passing]
            DepInstall --> FE_Build[Production Build: vite build]
            FE_Build --> SecAudit[Security Audit: npm audit]
        end
        
        SecAudit --> Gate1{Stage 1 Passed?}
        Gate1 -->|Failure| AlertFail[Send CI Failure Notification]
        Gate1 -->|Success| Job2[Job 2: Container Validation]
        
        subgraph Stage2 [Stage 2 Details]
            Job2 --> SetupBuildx[Set up Docker Buildx]
            SetupBuildx --> BuildBE[Validate Backend Dockerfile Build]
            SetupBuildx --> BuildFE[Validate Frontend Nginx Dockerfile Build]
        end
        
        BuildFE --> Gate2{Stage 2 Passed?}
        Gate2 -->|Failure| AlertFail
        Gate2 -->|Success| Job3[Job 3: Deployment Readiness Verification]
        
        subgraph Stage3 [Stage 3 Details]
            Job3 --> BranchCheck[Branch Guard: master/main only]
            BranchCheck --> AuditManifests[Verify Compose & .env.example Configs]
        end
    end

    %% Container Registry & Deployment
    subgraph DEPLOY [4. Deployment & Hosting Strategy]
        Job3 --> Release[Ready for Automated Staging Release]
        Release --> DockerCompose[Docker Compose Multi-Container Orchestration]
        
        subgraph Containers [Container Runtime Topology]
            DockerCompose --> ContainerFE[callilab-frontend: Nginx Port 80]
            DockerCompose --> ContainerBE[callilab-backend: Express Port 5000]
            DockerCompose --> ContainerDB[callilab-mongodb: Mongo 7.0 Port 27017]
            ContainerFE -->|Reverse Proxy /api/| ContainerBE
            ContainerBE -->|Mongoose Pool| ContainerDB
        end
    end

    %% Observability & Health
    subgraph OPS [5. Production Observability]
        ContainerBE --> HealthCheck[HTTP Health Probe: GET /api/health]
        HealthCheck --> Monitor[Uptime, Memory, & Connection Monitoring]
    end

    classDef success fill:#dcfce7,stroke:#16a34a,stroke-width:2px;
    classDef stage fill:#f1f5f9,stroke:#64748b,stroke-width:1px;
    classDef alert fill:#fee2e2,stroke:#dc2626,stroke-width:2px;
    class Gate1,Gate2,HealthCheck success;
    class AlertFail alert;
    class Stage1,Stage2,Stage3 stage;
```

---

## 2. Stage-by-Stage Verification Gate Matrix

| Phase | Tool / Action | Quality Gate | Action on Failure |
| :--- | :--- | :--- | :--- |
| **Local Check** | `npm test` | 100% test pass rate (7 BE + 4 FE) | Block commit |
| **Static Analysis** | `npm run lint` | 0 fatal errors, rules-of-hooks valid | Block PR merge |
| **Compilation** | `vite build` | Zero bundle syntax errors, gzip < 300KB | Block CI build |
| **Container Build** | `docker buildx` | Successful multi-stage Docker build | Reject release |
| **Runtime Health** | `/api/health` | Status code 200, status `healthy` | Trigger orchestrator restart |
