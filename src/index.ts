import { calcJuliaSet } from '@/utils'
import Bun from 'bun'

const setHeader = (statusCode: number) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'ORIGIN, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Request-Headers': 'Content-Type, Accept'
    },
    ...{ status: statusCode }
  }
}

Bun.serve({
  port: Bun.env.API_PORT,
  async fetch(req: Request) {
    if (req.method === 'OPTIONS') {
      return new Response('Success', setHeader(204))
    }

    const { pathname } = new URL(req.url)

    if (pathname !== '/calc' && req.method !== 'POST') {
      return new Response('500 Error', setHeader(500))
    }

    if (req.body) {
      return handlePostRequest(req)
    }

    return new Response('404 Error', setHeader(500))
  }
})

async function handlePostRequest(request: Request) {
  try {
    const bodyStr = await request.text()
    const values = JSON.parse(bodyStr)

    const result = calcJuliaSet(
      Number(values.min_x),
      Number(values.max_x),
      Number(values.min_y),
      Number(values.max_y),
      Number(values.comp_const_a),
      Number(values.comp_const_b)
    )

    return new Response(JSON.stringify({ rows: result }), setHeader(200))
  } catch (_) {
    return new Response('500 Error', setHeader(500))
  }
}
