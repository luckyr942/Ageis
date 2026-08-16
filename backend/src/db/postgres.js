import pg from 'pg';
import { config } from '../config/config.js';

const { Pool } = pg;

export const pgPool = new Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.database,
    connectionTimeoutMillis: 3000,
});

export async function checkPostgresConnection(){
    try{
        const client = await pgPool.connect();
        client.release();
        return true;
    }catch(error){
        console.error('[DB Warning] PostgresSQL ping failed:', error.message);
        return false;
    }
}
