// routes/documentoPDF.routes.ts
import express from 'express';
import * as documentoPDFController from '../controllers/documentoPDFController';
const router = express.Router();

router.get('/', documentoPDFController.getAllDocumentosPDF);
router.get('/:id', documentoPDFController.getDocumentoPDFById);
router.post('/', documentoPDFController.createDocumentoPDF);
router.put('/:id', documentoPDFController.updateDocumentoPDF);
router.delete('/:id', documentoPDFController.deleteDocumentoPDF);

export default router;

