// routes/miembroCampaña.routes.ts
import express from 'express';
import * as miembroCampañaController from '../controllers/miembroCampañaController';
const router = express.Router();

router.get('/', miembroCampañaController.getAllMiembros);
router.get('/:id', miembroCampañaController.getMiembroById);
router.get('/area/:area', miembroCampañaController.getMiembrosByArea);
router.post('/', miembroCampañaController.createMiembro);
router.put('/:id', miembroCampañaController.updateMiembro);
router.delete('/:id', miembroCampañaController.deleteMiembro);

export default router;