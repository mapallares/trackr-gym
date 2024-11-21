import express from 'express'
import cors from 'cors'
import productsRoutes from './routes/products.routes.js'
import detailsRoutes from './routes/details.routes.js'
import inventoryMovementRoutes from './routes/inventorymovements.routes.js'
const app = express();

app.use(cors())
app.use(express.json())

const VERSIONING = '/api/v1/inventory'

app.use(VERSIONING, productsRoutes)
app.use(VERSIONING, detailsRoutes)
app.use(VERSIONING, inventoryMovementRoutes)

export default app;