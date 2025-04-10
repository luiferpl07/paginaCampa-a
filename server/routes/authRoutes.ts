// routes/authRoutes.ts
import express from 'express';
import { login, logout, checkAuth, getMe } from '../controllers/authController';
import { verifyAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', verifyAuth, (req, res) => {
  res.status(200).json({
    message: 'Token válido',
    user: (req as any).user,
  });
});

router.get('/me', verifyAuth, getMe);

export default router;
