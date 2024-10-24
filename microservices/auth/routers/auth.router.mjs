import express from 'express'

const router = express.Router()

router.get('/', (request, response) => {
    response.send('TrackrGym Auth Microservice')
})

export default router