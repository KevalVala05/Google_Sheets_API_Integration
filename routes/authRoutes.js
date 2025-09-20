import { Router } from 'express';
import { authenticate, oauth2callback, userLogout } from '../controllers/authController.js';

const router = Router();

// Authentication Routes
router.get('/auth', authenticate);
router.get('/oauth2callback', oauth2callback);
router.get('/logout', userLogout);

export default router;
