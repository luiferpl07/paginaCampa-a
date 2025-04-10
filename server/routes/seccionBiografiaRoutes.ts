// routes/seccionBiografia.routes.ts
import express from 'express';
import * as seccionBiografiaController from '../controllers/seccionBiografiaController';
const router = express.Router();

router.get('/', seccionBiografiaController.getAllSeccionesBiografia);
router.get('/:id', seccionBiografiaController.getSeccionBiografiaById);
router.post('/', seccionBiografiaController.createSeccionBiografia);
router.put('/:id', seccionBiografiaController.updateSeccionBiografia);
router.delete('/:id', seccionBiografiaController.deleteSeccionBiografia);

export default router;

