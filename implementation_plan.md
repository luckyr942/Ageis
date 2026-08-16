# Implementation Plan: Aegis — AI Engineering Incident Copilot (Day 1)

Aegis is an enterprise-grade AI Agent Incident Copilot that autonomously investigates system incidents, forms root-cause hypotheses with confidence scoring, enforces Human-In-The-Loop (HITL) approval, and verifies remediation.

This plan details **Day 1: Setup & Architecture Baseline**, transitioning to the Python/FastAPI + LangGraph architecture while setting up local infrastructure (PostgreSQL & Qdrant) via Docker Compose.

---

## User Review Required

> [!IMPORTANT]
> **Mentorship & Guided Execution Mode:**
> Per your instructions, code will **not** be generated automatically into source files without your step-by-step participation. Each step will provide:
> 1. Architectural context & concept explanations.
> 2. Exact code templates and line-by-line guidance for you to write/apply.
> 3. Terminal commands and verification steps for you to run and inspect.

---

## Open Questions

> [!NOTE]
> 1. **Existing Node.js files in `backend/`**: Should we archive/remove the existing sample Node/Express files in `backend/` as we set up the Python FastAPI structure (`backend/app/...`), or keep them in a subfolder for reference?
> 2. **PostgreSQL & Qdrant Ports**: We will use standard ports `5432` for PostgreSQL and `6333`/`6334` for Qdrant. Please verify these ports are available on your machine.

---

## Proposed Changes

### Monorepo Structure & Python Environment

#### [NEW] [.gitignore](file:///Users/luckyraj/Desktop/Aegis/.gitignore)
- Ignore Python venv (`.venv`), `__pycache__`, `.env`, Docker volumes, node_modules.

#### [NEW] [backend/.env.example](file:///Users/luckyraj/Desktop/Aegis/backend/.env.example)
- Define environment configuration variables (PostgreSQL URI, Qdrant URL, OpenAI/Anthropic keys, Log level).

#### [NEW] [backend/requirements.txt](file:///Users/luckyraj/Desktop/Aegis/backend/requirements.txt)
- Core dependencies: `fastapi`, `uvicorn`, `pydantic`, `pydantic-settings`, `langgraph`, `langchain`, `qdrant-client`, `psycopg2-binary` / `asyncpg`, `sqlalchemy`, `httpx`, `pytest`.

---

### Infrastructure & Containers

#### [NEW] [docker-compose.yml](file:///Users/luckyraj/Desktop/Aegis/docker-compose.yml) or [infra/docker-compose.yml](file:///Users/luckyraj/Desktop/Aegis/infra/docker-compose.yml)
- **PostgreSQL 16**: Persistence for incident state, logs, traces, and HITL approvals.
- **Qdrant**: Vector database for Runbook RAG & ACL-filtered past incident retrieval.

---

### FastAPI Backend Skeleton

#### [NEW] [backend/app/main.py](file:///Users/luckyraj/Desktop/Aegis/backend/app/main.py)
- Main FastAPI application with CORS middleware, health check endpoints (`/health`, `/health/db`, `/health/qdrant`).

#### [NEW] [backend/app/core/config.py](file:///Users/luckyraj/Desktop/Aegis/backend/app/core/config.py)
- Pydantic Settings management for environment variables.

#### [NEW] [backend/app/core/db.py](file:///Users/luckyraj/Desktop/Aegis/backend/app/core/db.py)
- Database connection pools for PostgreSQL and client instance for Qdrant.

---

## Verification Plan

### Manual Verification
1. **Virtual Environment Verification**: Activate Python venv, install `requirements.txt`, and verify with `pip list`.
2. **Container Health Check**: Run `docker compose up -d` and verify container status with `docker compose ps`.
3. **API Health Check**: Launch FastAPI with `uvicorn app.main:app --reload` and query `/health` endpoints to verify live connections to PostgreSQL and Qdrant.
