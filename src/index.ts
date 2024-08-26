import { checkDiverge } from '@/utils'
import Bun from 'bun'

const PORT = 8888
const CORS_HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'ORIGIN, POST',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Request-Headers': 'Content-Type, Accept'
  }
}

Bun.serve({
  port: PORT,
  async fetch(req: Request) {
    if (req.method === 'OPTIONS') {
      return new Response('Success', {
        ...CORS_HEADERS,
        ...{ status: 204 }
      })
    }

    const { pathname } = new URL(req.url)
    if (pathname !== '/calc' && req.method !== 'POST') {
      return new Response('500 Error', { ...CORS_HEADERS, ...{ status: 500 } })
    }

    if (req.body) {
      return handlePostRequest(req)
    }

    return new Response('404 Error', { ...CORS_HEADERS, ...{ status: 500 } })
  }
})

async function handlePostRequest(request: Request) {
  try {
    const bodyStr = await request.text()
    const values = JSON.parse(bodyStr)

    const result = checkDiverge(
      Number(values.min_x),
      Number(values.max_x),
      Number(values.min_y),
      Number(values.max_y),
      Number(values.comp_const_a),
      Number(values.comp_const_b)
    )

    return new Response(JSON.stringify({ rows: result }), {
      ...CORS_HEADERS,
      ...{ status: 200 }
    })
  } catch (_) {
    return new Response('500 Error', { ...CORS_HEADERS, ...{ status: 500 } })
  }
}
