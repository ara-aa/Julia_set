import express from 'express'
import { checkDiverge } from '@/utils'

const app: express.Express = express()
const port = 8888

app.listen(port)
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.post('/julia', (req, res) => {
  try {
    const data = req.body
    const result = checkDiverge(
      Number(data['min_x']),
      Number(data['max_x']),
      Number(data['min_y']),
      Number(data['max_y']),
      data['comp_const'],
    )

    if (typeof result === 'string') {
      res.status(412).json({ errorMessage: result })
    } else {
      res.json({ rows: result })
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'エラーが発生しました。やり直してください。',
    })
  }
})
