import express from 'express';
import authController from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/onboarding' , protectRoute, authController.onboard);

// check login or not 
router.get('/me', protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
});

export default router;