import express from 'express';
import {updateUser,deleteUser,getSingleUser,getAllUser} from '../controllers/userController.js'
import {authenticate,restrict} from '../auth/verifyToken.js'
const router=express.Router();
router.get('/:id',authenticate,restrict(['admin']),getSingleUser);
router.get('/',getAllUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;
