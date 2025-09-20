import { Router } from 'express';
import { uploadCsv, fetchData } from '../controllers/sheetsController.js';

const router = Router();

// Application Functionality Routes
router.get('/upload-csv', uploadCsv);
router.get('/fetch-data', fetchData);

export default router;
