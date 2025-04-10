// routes/video.routes.ts
import express from 'express';
import * as videoController from '../controllers/videoController';
const router = express.Router();

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/', videoController.createVideo);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

export default router;

