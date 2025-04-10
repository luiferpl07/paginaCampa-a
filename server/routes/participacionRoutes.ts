import express from 'express';
import * as participacionController from '../controllers/participacionController';

const router = express.Router();

// GET all participaciones
router.get('/', participacionController.getAllParticipaciones);

// GET participacion by ID
router.get('/:id', participacionController.getParticipacionById);

// POST new participacion
router.post('/', participacionController.createParticipacion);

// PUT/UPDATE participacion
router.put('/:id', participacionController.updateParticipacion);

// DELETE participacion
router.delete('/:id', participacionController.deleteParticipacion);

export default router;