// server/routes/uploadRoutes.ts
import express from 'express';
import { handleFileUpload } from '../controllers/uploadController';

const router = express.Router();

// Una sola ruta para subir archivos
router.post('/', handleFileUpload);

export default router;