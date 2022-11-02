import express from 'express'
import { waterLevel, serviceSocket } from './controllers/ConsultingController.js';

const router = express.Router()

router
    .get('/water', waterLevel)
    .post('/waterSokect', serviceSocket)

export default router