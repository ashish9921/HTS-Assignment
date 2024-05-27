import { Router } from "express";

const router =Router()

import { loginuser, registerUser } from "../controllers/user.controller.js";

router.route('/register').post(registerUser)
router.route('/login').post(loginuser)



export default router   