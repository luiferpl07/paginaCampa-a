// routes/historiaBio.routes.ts
import express from 'express';
import * as historiaBioController from '../controllers/historiaBioController';
const router = express.Router();

router.get('/', historiaBioController.getAllHistoriasBio);
router.get('/:id', historiaBioController.getHistoriaBioById);
router.post('/', historiaBioController.createHistoriaBio);
router.put('/:id', historiaBioController.updateHistoriaBio);
router.delete('/:id', historiaBioController.deleteHistoriaBio);

export default router;

