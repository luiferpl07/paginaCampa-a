// routes/evento.routes.ts
import express from 'express';
import * as eventoController from '../controllers/eventoController';
const router = express.Router();

router.get('/', eventoController.getAllEventos);
router.get('/:id', eventoController.getEventoById);
router.post('/', eventoController.createEvento);
router.put('/:id', eventoController.updateEvento);
router.delete('/:id', eventoController.deleteEvento);

export default router;

