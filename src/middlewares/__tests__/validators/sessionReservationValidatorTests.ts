import {
  defaultPatientIdMock,
  defaultDoctorIdMock,
} from '../../../utils/testUtils';
import {validateSessionBody} from '../../validators';
import testValidator from './testValidatorFunction';

export default () =>
  describe('Session validation middleware', () => {
    it('with valid body', () => {
      testValidator(
        validateSessionBody,
        {
          patientId: defaultPatientIdMock,
          doctorId: defaultDoctorIdMock,
          date: new Date(),
        },
        true,
      );
    });

    it('with invalid body', () => {
      testValidator(
        validateSessionBody,
        {
          patientId: defaultPatientIdMock,
          doctorId: defaultDoctorIdMock,
        },
        false,
      );
    });

    it('without sending body', () => {
      testValidator(validateSessionBody, undefined, false);
    });
  });
