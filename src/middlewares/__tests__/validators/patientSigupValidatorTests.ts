import {validateSignUpBody} from '../../validators';
import testValidator from './testValidatorFunction';
export default () =>
  describe('Patient signup validation middleware', () => {
    it('with valid body', () => {
      testValidator(
        validateSignUpBody,
        {
          username: 'admin',
          password: 'admins',
          confirmPassword: 'admins',
          userType: 'patient',
          profile: {
            firstName: 'test',
            lastName: 'test',
          },
        },
        true,
      );
    });

    it('with invalid body', () => {
      testValidator(
        validateSignUpBody,
        {
          username: 'admin',
          password: 'admin',
          confirmPassword: 'admin',
          userType: 'patient',
        },
        false,
      );
    });

    it('without sending body', () => {
      testValidator(validateSignUpBody, undefined, false);
    });
  });
