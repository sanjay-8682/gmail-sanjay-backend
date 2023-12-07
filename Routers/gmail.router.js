import express from "express"

import {registerUser,loginUser,getUserById,gmailSend} from '../Controllers/gmail.controller.js';
import authMiddleware from '../Middleware/auth.middleware.js'

import cors from 'cors'


const router=express.Router()

router.use(
    cors({
        credentials:true,
        origin: 'https://glowing-croquembouche-962080.netlify.app'
    })
)

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/find',authMiddleware,getUserById)
router.post('/sendmail',gmailSend)





export default router;
