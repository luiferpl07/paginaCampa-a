// routes/eLibro.routes.ts
import express from 'express';
import * as eLibroController from '../controllers/eLibroController';
const router = express.Router();

router.get('/', eLibroController.getAllELibros);
router.get('/:id', eLibroController.getELibroById);
router.post('/', eLibroController.createELibro);
router.put('/:id', eLibroController.updateELibro);
router.delete('/:id', eLibroController.deleteELibro);

export default router;

