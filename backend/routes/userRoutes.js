import express from 'express'
import { authUser, getUserAccount, addUser} from '../controllers/userController.js'
const router = express.Router()
import {shield} from '../middleware/validateTokenMiddleware.js'

router.post('/login', authUser) // to login 
router.route('/account').get(shield, getUserAccount) // to authorise with jwt tokens  and view user profile 
//router.post('/', addUser)// to create a new user

router.route('/').post(addUser)




export default router