import {validatePatchDoctor} from '../../validators';
import testValidator from './testValidatorFunction';

export default () =>
  describe('Doctor patch validation middleware', () => {
    it('with valid body', () => {
      testValidator(
        validatePatchDoctor,
        {
          username: 'admin',
          password: 'admins',
          confirmPassword: 'admins',
          userType: 'doctor',
          profile: {
            firstName: 'test',
            lastName: 'test',
            address: 'my address',
            phone: '0758081532',
          },
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
