import express from 'express';
import { updateUser, deleteUser, getSingleUser, getAllUser, getUserProfile, getMyAppointments, updateRole } from '../controllers/userController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
const router = express.Router();
router.get('/:id', authenticate, restrict(["patient"]), getSingleUser);
router.get('/', authenticate, restrict(["admin"]), getAllUser);
router.put('/:id', authenticate, restrict(["patient"]), updateUser);
router.delete('/:id', authenticate, restrict(["patient"]), deleteUser);
router.get('/profile/me', authenticate, restrict(["patient", "admin"]), getUserProfile);
router.get('/appointments/my-appointments', authenticate, restrict(["patient"]), getMyAppointments);
// router.get('/', authenticate, restrict(["patient"]), updateRole);
export default router;
