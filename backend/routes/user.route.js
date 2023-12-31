import express from 'express';
import { deleteUser, updateUser, getUserPost } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/post/:id', verifyToken, getUserPost);



export default router;