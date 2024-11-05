import {Router} from 'express'
import { getServices, createService, updateService, deleteService, getService, getServiceActivites} from '../controllers/services.controller.js'

const router = Router()

router.get('/services', getServices)
router.post('/services', createService)
router.put('/services/:id', updateService)  
router.delete('/services/:id', deleteService)  
router.get('/services/:id', getService)
router.get('/services/:id/activities', getServiceActivites)


export default router;