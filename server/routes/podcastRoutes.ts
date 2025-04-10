// routes/podcast.routes.ts
import express from 'express';
import * as podcastController from '../controllers/podcastController';
const router = express.Router();

router.get('/', podcastController.getAllPodcasts);
router.get('/:id', podcastController.getPodcastById);
router.post('/', podcastController.createPodcast);
router.put('/:id', podcastController.updatePodcast);
router.delete('/:id', podcastController.deletePodcast);

export default router;

