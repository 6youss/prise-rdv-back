import {validatePatchDoctor} from '../../validators';
import testValidator from './testValidatorFunction';

export default () =>
  describe('Doctor patch validation middleware', () => {
    it('with valid body', () => {
      testValidator(
        validatePatchDoctor,
        {
          firstName: undefined,
          workingHours: [
            {
              from: new Date().toISOString(),
              to: new Date().toISOString(),
              opensAt: '08:00',
              closesAt: '17:00',
            },
          ],
        },
        true,
      );
    });

    it('with invalid body', () => {
      testValidator(
        validatePatchDoctor,
        {
          username: 'admin',
          password: 'admin',
          confirmPassword: 'admin',
          userType: 'doctor',
        },
        false,
      );
    });

    it('without sending body', () => {
      testValidator(validatePatchDoctor, undefined, false);
    });
  });
