import {
	CONFIRMED_PASSWORD_ERROR_MESSAGE,
	INVALID_EMAIL_ERROR_MESSAGE,
	PASSWORD_FORMAT_ERROR_MESSAGE,
	USERNAME_MUST_BE_LONG_ERROR_MESSAGE
} from 'constants/errorMessages';
import { getFormErrors } from 'helpers/getFormErrors';

describe('getFormErrors()', () => {
	describe('When all fields match all validations', () => {
		const fieldsValueOk = {
			username: 'johndoe',
			email: 'john@doe.com',
			password: 'Password!0',
			confirmedPassword: 'Password!0'
		};

		it('should return null', () => {
			expect(getFormErrors(fieldsValueOk)).toBeNull();
		});
	});

	describe('When there are any error within user inputs', () => {
		const fieldsValueNotOk = {
			username: 'j',
			email: 'johndoe.com',
			password: 'not-strong-password',
			confirmedPassword: 'wrong-confirmed-password'
		};

		it('should return an object with corresponding error messages', () => {
			expect(getFormErrors(fieldsValueNotOk)).toEqual({
				username: USERNAME_MUST_BE_LONG_ERROR_MESSAGE,
				email: INVALID_EMAIL_ERROR_MESSAGE,
				password: PASSWORD_FORMAT_ERROR_MESSAGE,
				confirmedPassword: CONFIRMED_PASSWORD_ERROR_MESSAGE
			});
		});
	});
});
