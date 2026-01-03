# Talent Intelligence App Backend

This repository contains the backend infrastructure for the Talent Intelligence Job Seeker App.

## Prerequisites
- Node.js 18.17+ 
- PostgreSQL (or Supabase URL)

## Setup

1. **Install Dependencies** (Since automatic installation failed)
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/talent_db"
   OPENAI_API_KEY="sk-..." # Optional, for real embeddings
   ```

3. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Architecture
- **`/prisma/schema.prisma`**: Defines the data model (`User`, `Job`, `Resume`, `Application`) and vector search support.
- **`/app/api/jobs`**: Handles semantic job search using pgvector (mocked embedding generation in `lib/ai.ts`).
- **`/app/api/resume`**: Handles resume uploads and parsed data storage.
- **`/app/api/tracker`**: Manages the Kanban board state.
