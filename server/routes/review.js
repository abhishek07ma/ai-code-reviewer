import express from 'express';
import { createReview, getHistory } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/review', createReview);
router.get('/history', getHistory);

export default router;
