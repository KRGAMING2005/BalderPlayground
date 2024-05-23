import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (request) => {
    const data = await request.request.text();
    const jsonData = JSON.parse(data);
    console.log(jsonData)
    //TODO: Save data.
    return new Response(null, { headers: {
        status: "200"
    }});
}