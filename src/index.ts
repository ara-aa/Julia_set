import { checkDiverge } from '@/utils'
// import express from 'express'
import Bun from 'bun'

const PORT = 8888
const CORS_HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'ORIGIN, POST',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Request-Headers': 'Content-Type, Accept',
  },
}

Bun.serve({
  port: PORT,
  async fetch(req: Request) {
    console.log('!!!!!!!')
    if (req.method === 'OPTIONS') {
      return new Response('Success', {
        ...{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
            'Access-Control-Request-Headers': 'Content-Type, Accept',
          },
        },
        ...{ status: 204 },
      })
    }

    const { pathname } = new URL(req.url)
    if (pathname !== '/calc' && req.method !== 'POST') {
      return new Response('500 Error', { ...CORS_HEADERS, ...{ status: 500 } })
    }

    if (req.body) {
      console.log('ok')
      return new Response('Success', { ...CORS_HEADERS, ...{ status: 200 } })
      // handlePostRequest(req)
    }

    return new Response('404 Error', { ...CORS_HEADERS, ...{ status: 500 } })
  },
})

async function handlePostRequest(request: Request) {
  try {
    const bodyStr = await request.text() // リクエストのボディを取得

    console.log(bodyStr)
    // if (
    //   !signatureValidation(
    //     request.headers['x-line-signature'],
    //     CH_SECRET,
    //     bodyStr,
    //   )
    // ) {
    //   console.log('署名認証エラー')
    //   return
    // }

    // if (JSON.parse(bodyStr) && JSON.parse(bodyStr).events.length < 1) {
    //   console.log('おそらくLINE Developersからの検証イベント')
    //   return
    // }

    // const events = JSON.parse(bodyStr).events
    // const responses = await Promise.all(events.map(handleEvent))
    // console.log(responses[0])

    // // レスポンスを返す
    // return new Response('POST request received: ' + body)
  } catch (_) {
    return new Response('500 Error', { ...CORS_HEADERS, ...{ status: 500 } })
  }
}

// const app: express.Express = express()
// const port = 8888

// app.listen(port)
// app.use(express.json())

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
//   res.setHeader('Access-Control-Allow-Methods', 'POST')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   next()
// })

// app.post('/julia', (req, res) => {
//   try {
//     const data = req.body
//     const result = checkDiverge(
//       Number(data.min_x),
//       Number(data.max_x),
//       Number(data.min_y),
//       Number(data.max_y),
//       Number(data.comp_const_a),
//       Number(data.comp_const_b),
//     )

//     if (typeof result === 'string') {
//       res.status(412).json({ errorMessage: result })
//     } else {
//       res.json({ rows: result })
//     }
//   } catch (_) {
//     res.status(500).json({
//       errorMessage: 'エラーが発生しました。やり直してください。',
//     })
//   }
// })
