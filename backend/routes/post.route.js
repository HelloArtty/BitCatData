import expree from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = expree.Router();

router.post('/create', verifyToken, createPost);

export default router;