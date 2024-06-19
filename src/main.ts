import express from 'express'
import { registerApiRoutes } from './routes/api.routes'
const port = '3000'

const app = express()
app.use(express.json())
app.use(express.static('public'))

registerApiRoutes(app)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
