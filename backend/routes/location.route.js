import express from 'express';
import { createLocation, testlocation } from '../controllers/location.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test-location', testlocation)
router.post('/create-location', verifyToken, createLocation);
// router.post('/update-contact/:id', verifyToken, updateContact);

export default router;