import expree from "express";
import { createPost, getPost, deletePost, updatePost, getPosts} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = expree.Router();

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.post('/update/:id', verifyToken, updatePost);
router.get('/get/:id', getPost);
router.get('/get', getPosts);

export default router;