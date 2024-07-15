import { query } from '@/utils/db';



export const GETitems = async () => {
    const result = await query('SELECT * FROM items;');
    const items = result.rows
    return new Response (JSON.stringify(items))
}