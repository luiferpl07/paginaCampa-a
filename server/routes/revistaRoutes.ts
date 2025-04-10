// routes/revista.routes.ts
import express from 'express';
import * as revistaController from '../controllers/revistaController';
const router = express.Router();

router.get('/', revistaController.getAllRevistas);
router.get('/:id', revistaController.getRevistaById);
router.post('/', revistaController.createRevista);
router.put('/:id', revistaController.updateRevista);
router.delete('/:id', revistaController.deleteRevista);

export default router;

