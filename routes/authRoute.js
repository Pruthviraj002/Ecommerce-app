import express from 'express'
import { login, registerController } from '../controller/authController.js'
const router = express.Router()

router.post('/register', registerController)
router.post('/login', login)

export default router