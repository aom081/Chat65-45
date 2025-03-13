import express from 'express';
const router = express.Router();
import { signUp } from '../controllers/auth.controller.js';
import { signIn } from '../controllers/auth.controller.js';
import { signOut } from '../controllers/auth.controller.js';
import { protectedRouter } from '../middleware/protectedRouter.js';
import { uploadProfile } from '../controllers/auth.controller.js';
import { checkAuth } from '../controllers/auth.controller.js';

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.put("/uploadProfile", protectedRouter, uploadProfile);
router.get("/checkAuth", protectedRouter, checkAuth);


export default router;