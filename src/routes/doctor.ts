import {Router} from 'express';
import DoctorController from '../controllers/DoctorController';
import {validatePhoneParam} from '../middlewares/validators';

const router = Router();

router.get('/', DoctorController.getDoctors);
router.get('/:phone', validatePhoneParam, DoctorController.getDoctorByPhone);
router.get('/:searchValue', DoctorController.getSearchedDoctors);
router.patch('/:doctorId', DoctorController.patchDoctor);

export default router;
