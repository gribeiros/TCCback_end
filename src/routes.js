import express from 'express'
import { updateStatus } from './controllers/ConsultingController.js';

const router = express.Router()

router
    .get('/update-status', updateStatus)

export default router