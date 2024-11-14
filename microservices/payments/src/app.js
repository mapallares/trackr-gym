import express from 'express'
import paymentsRoutes from './routes/payments.routes.js'
import currencyAmountUnitTypeRoutes from './routes/currencyAmountUnitType.routes.js'
import invoicesRoutes from './routes/invoices.routes.js'
import paymentMethodsRoutes from './routes/paymentMethods.routes.js'
import paymentsCommentsRoutes from './routes/paymentsComments.routes.js'

const app = express();

app.use(express.json())
app.use(paymentsRoutes)
app.use(currencyAmountUnitTypeRoutes)
app.use(invoicesRoutes)
app.use(paymentMethodsRoutes)
app.use(paymentsCommentsRoutes)

export default app;