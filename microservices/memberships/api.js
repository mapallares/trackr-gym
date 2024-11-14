import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import membershipsRouter from './routers/memberships.router.mjs'
import gymsRouter from './routers/gyms.router.mjs'
import networksRouter from './routers/networks.router.mjs'
import branchesRouter from './routers/branches.router.mjs'
import schedulesRouter from './routers/schedules.router.mjs'
import plansRouter from './routers/plans.router.mjs'
import benefitsRouter from './routers/benefits.router.mjs'

dotenv.config()

const app = express()

app.use(cors())
app.use(cookieParser())

app.use((request, response, next) => {
  express.json()(request, response, (error) => {
      if (error) return response.status(400).json({
              type: 'InvalidFormatError',
              message: 'JSON inválido. Verifica que las propiedades y valores estén correctamente formateados.'
            })
      next()
  })
})

const VERSIONING = '/api/v1/memberships'
const PORT = process.env.PORT || 3002

app.use(VERSIONING, membershipsRouter)
app.use(VERSIONING, gymsRouter)
app.use(VERSIONING, networksRouter)
app.use(VERSIONING, branchesRouter)
app.use(VERSIONING, schedulesRouter)
app.use(VERSIONING, plansRouter)
app.use(VERSIONING, benefitsRouter)

app.listen(PORT, () => {
  console.log(`TrackrGym Memberships Microservice running on http://localhost:${PORT + VERSIONING}`)
})