import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { checkPostgresConnection } from './db/postgres.js';
import { checkQdrantConnection } from './db/qdrant.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  const postgresStatus = await checkPostgresConnection();
  const qdrantStatus = await checkQdrantConnection();

  const isHealthy = postgresStatus && qdrantStatus;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'degraded',
    service: config.projectName,
    environment: config.env,
    dependencies: {
      postgres: postgresStatus ? 'connected' : 'disconnected',
      qdrant: qdrantStatus ? 'connected' : 'disconnected',
    },
  });
});

app.listen(config.port, () => {
  console.log(`🛡️  AegisOps Backend listening on http://localhost:${config.port}`);
});
