import { QdrantClient } from '@qdrant/js-client-rest';
import { config } from '../config/config.js';

export const qdrantClient = new QdrantClient({
  url: `http://${config.qdrant.host}:${config.qdrant.port}`,
  checkCompatibility: false,
});

export async function checkQdrantConnection() {
  try {
    await qdrantClient.getCollections();
    return true;
  } catch (error) {
    console.error('[DB Warning] Qdrant ping failed:', error.message);
    return false;
  }
}
