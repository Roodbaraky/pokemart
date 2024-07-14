

import { query } from '@/utils/db';
import { NextRequest } from 'next/server';



export const GET = async (req: NextRequest) => {
  const itemName = req.nextUrl.pathname.slice(18)
  //this is super hacky and not correct ^^^
  try {
    const result = await query('SELECT * FROM offers WHERE name = $1;', [itemName]);

    if (result.rows.length === 0) {
      return new Response('', { status: 404, statusText: 'Not found' });
    }
  
    return new Response(JSON.stringify(result.rows[0]))
  } catch (error) {
    console.error('Error fetching special price:', error);
    return new Response('', { status: 500, statusText: 'Database error' });
  }
}




