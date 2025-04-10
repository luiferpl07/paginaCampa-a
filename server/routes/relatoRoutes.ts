import express from 'express';
import * as relatoController from '../controllers/relatoController';

const router = express.Router();

// GET all relatos
router.get('/', relatoController.getAllRelatos);

// GET relato by ID
router.get('/:id', relatoController.getRelatoById);

// POST new relato
router.post('/', relatoController.createRelato);

// PUT/UPDATE relato
router.put('/:id', relatoController.updateRelato);

// DELETE relato
router.delete('/:id', relatoController.deleteRelato);

export default router;