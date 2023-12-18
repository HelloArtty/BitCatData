import express from 'express';
import { createContact, testcontact } from '../controllers/contact.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test-contact', testcontact)
router.post('/create-contact', verifyToken,createContact);
// router.post('/update-contact/:id', verifyToken, updateContact);

export default router;