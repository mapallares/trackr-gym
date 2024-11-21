import express from 'express'
import cors from 'cors'
import paymentsRoutes from './routes/payments.routes.js'
import currencyAmountUnitTypeRoutes from './routes/currencyAmountUnitType.routes.js'
import invoicesRoutes from './routes/invoices.routes.js'
import paymentMethodsRoutes from './routes/paymentMethods.routes.js'
import paymentsCommentsRoutes from './routes/paymentsComments.routes.js'

const app = express();

app.use(cors())
app.use(express.json())

const VERSIONING = '/api/v1/payments'

app.use(VERSIONING, paymentsRoutes)
app.use(VERSIONING, currencyAmountUnitTypeRoutes)
app.use(VERSIONING, invoicesRoutes)
app.use(VERSIONING, paymentMethodsRoutes)
app.use(VERSIONING, paymentsCommentsRoutes)

export default app;