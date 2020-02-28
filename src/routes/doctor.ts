import {Router} from 'express';
import DoctorController from '../controllers/DoctorController';
import {
  validatePhoneParam,
  validatePatchDoctor,
  validateDoctorIdParam,
} from '../middlewares/validators';

const router = Router();

router.get('/', DoctorController.getDoctors);
router.get('/:phone', validatePhoneParam, DoctorController.getDoctorByPhone);
router.get('/:searchValue', DoctorController.getSearchedDoctors);
router.patch(
  '/:doctorId',
  validateDoctorIdParam,
  validatePatchDoctor,
  DoctorController.patchDoctor,
);

export default router;
