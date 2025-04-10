// routes/trayectoriaPolitica.routes.ts
import express from 'express';
import * as trayectoriaPoliticaController from '../controllers/trayectoriaPoliticaController';
const router = express.Router();

router.get('/', trayectoriaPoliticaController.getAllTrayectoriasPoliticas);
router.get('/:id', trayectoriaPoliticaController.getTrayectoriaPoliticaById);
router.post('/', trayectoriaPoliticaController.createTrayectoriaPolitica);
router.put('/:id', trayectoriaPoliticaController.updateTrayectoriaPolitica);
router.delete('/:id', trayectoriaPoliticaController.deleteTrayectoriaPolitica);

export default router;

