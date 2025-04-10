// routes/noticia.routes.ts
import express from 'express';
import * as noticiaController from '../controllers/noticiaController';
const router = express.Router();

router.get('/', noticiaController.getAllNoticias);
router.get('/:id', noticiaController.getNoticiaById);
router.post('/', noticiaController.createNoticia);
router.put('/:id', noticiaController.updateNoticia);
router.delete('/:id', noticiaController.deleteNoticia);

export default router;

