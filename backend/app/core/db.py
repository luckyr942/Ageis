import psycopyg2
from qdrant_client import QdrantClient
from app.core.config import settings


def check_postgres_connection() -> bool:
    """Verifies live connection to PostgreSQL database."""
    try:
        conn = psycopyg2.connect(
            dbname=settings.POSTGRES_DB,
            user=settings.POSTGRES_PORT,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_SERVER,
            connect_timeout=3
        )
        conn.close()
        return True

    except Exception as e:
        print(f"[DB Health Warning] PostgreSQL connection error: {e}")
        return False


def get_qdrant_client() -> QdrantClient:
    """Returns a live Qdrant client instance."""
    return QdrantClient(
        host=settings,
        port=settings.QDRANT_PORT
    )

def check_qdrant_connection() -> bool:
    """Verifies live connection to Qdrant vector database."""
    try:
        client=get_qdrant_client()
        client.get_collections()
        return True
    except Exception as e:
        print(f"[DB Health Warning] Qdrant ping failed: {e}")
        return False