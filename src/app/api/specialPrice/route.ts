

import { supabase } from '@/utils/db';
import { NextRequest } from 'next/server';



export const GET = async (req: NextRequest) => {
  const itemName = req.nextUrl.searchParams.get('itemName')
  try {
    const result = await supabase
      .from('offers')
      .select('*')
      .eq('name', itemName)


    if (result.data?.length === 0) {
      return new Response('', { status: 404, statusText: 'Not found' });
    }
    else if (result.data) {

      return new Response(JSON.stringify(result.data[0]))
    }
  } catch (error) {
    console.error('Error fetching special price:', error);
    return new Response('', { status: 500, statusText: 'Database error' });
  }
}




