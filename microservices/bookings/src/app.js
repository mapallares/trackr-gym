import express from 'express'
import cors from 'cors'
import bookingsRoutes from './routes/bookings.routes.js'
import activitiesRoutes from './routes/activities.routes.js'
import attendancesRoutes from './routes/attendances.routes.js'
import servicesRoutes from './routes/services.routes.js'

const app = express();

app.use(cors())
app.use(express.json());

const VERSIONING = '/api/v1/bookings'

app.use(VERSIONING, bookingsRoutes);
app.use(VERSIONING, activitiesRoutes);
app.use(VERSIONING, attendancesRoutes);
app.use(VERSIONING, servicesRoutes);

export default app;