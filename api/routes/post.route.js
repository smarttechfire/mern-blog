import express from "express";
import { create, deletepost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userid",verifyToken,deletepost);

export default router;
