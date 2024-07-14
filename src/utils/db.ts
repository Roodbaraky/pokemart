
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max:2
});

export async function query(text: string, params: any[] = []) {
    const start = Date.now();
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        const duration = Date.now() - start;
        // console.log('Executed query', { text, duration, rows: result.rowCount });
        return result;
    } finally {
        client.release();
        
    }
}
