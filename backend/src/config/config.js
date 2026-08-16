import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  projectName: process.env.PROJECT_NAME || 'AegisOps',
  env: process.env.ENV || 'development',

  postgres: {
    host: process.env.POSTGRES_SERVER || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    user: process.env.POSTGRES_USER || 'aegis',
    password: process.env.POSTGRES_PASSWORD || 'aegis_secret',
    database: process.env.POSTGRES_DB || 'aegis_db',
  },

  qdrant: {
    host: process.env.QDRANT_HOST || 'localhost',
    port: parseInt(process.env.QDRANT_PORT || '6333', 10),
  },

  llm: {
    geminiApiKey: process.env.GEMINI_API_KEY,
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    openAiApiKey: process.env.OPENAI_API_KEY,
    model: process.env.LLM_MODEL || 'gemini-3.6-flash',
  }
};
