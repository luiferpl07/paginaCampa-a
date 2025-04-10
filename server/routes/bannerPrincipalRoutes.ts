import express from 'express';
import * as bannerController from '../controllers/bannerPrincipalController';

const router = express.Router();

// GET all banners
router.get('/', bannerController.getAllBanners);

// GET banner by ID
router.get('/:id', bannerController.getBannerById);

// POST new banner
router.post('/', bannerController.createBanner);

// PUT/UPDATE banner
router.put('/:id', bannerController.updateBanner);

// DELETE banner
router.delete('/:id', bannerController.deleteBanner);

export default router;
