import express from 'express';
import { getStats, getActivity } from '../controllers/dashboardController';

const router = express.Router();

// Rutas para el dashboard
router.get('/stats', getStats);
router.get('/activity', getActivity);

export default router;