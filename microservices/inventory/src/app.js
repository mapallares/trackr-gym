import express from 'express'
import productsRoutes from './routes/products.routes.js'
import detailsRoutes from './routes/details.routes.js'
import inventoryMovementRoutes from './routes/inventorymovements.routes.js'

const app = express();

app.use(express.json())
app.use(productsRoutes)
app.use(detailsRoutes)
app.use(inventoryMovementRoutes)

export default app;