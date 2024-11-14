import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routers/auth.router.mjs'
import authenticationRouter from './routers/authentication.router.mjs'
import authorizationRouter from './routers/authorization.router.mjs'
import usersRouter from './routers/users.router.mjs'
import rolesRouter from './routers/roles.router.mjs'
import permissionsRouter from './routers/permissions.router.mjs'
import cookieParser from 'cookie-parser'

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

const VERSIONING = '/api/v1/auth'
const PORT = process.env.PORT || 3001

app.use(VERSIONING, router)
app.use(VERSIONING, authenticationRouter)
app.use(VERSIONING, authorizationRouter)
app.use(VERSIONING, usersRouter)
app.use(VERSIONING, rolesRouter)
app.use(VERSIONING, permissionsRouter)

app.listen(PORT, () => {
  console.log(`TrackrGym Auth Microservice running on http://localhost:${PORT + VERSIONING}`)
})