import express from 'express';
import * as propuestaController from '../controllers/propuestaController';

const router = express.Router();

// GET all propuestas
router.get('/', propuestaController.getAllPropuestas);

// GET propuesta by ID
router.get('/:id', propuestaController.getPropuestaById);

// POST new propuesta
router.post('/', propuestaController.createPropuesta);

// PUT/UPDATE propuesta
router.put('/:id', propuestaController.updatePropuesta);

// DELETE propuesta
router.delete('/:id', propuestaController.deletePropuesta);

export default router;