export enum ErrorMessages {
	// Not Found
	NOT_FOUND_ERROR_MESSAGE = 'Not found',

	// Valid Authentication
	SESSION_NOT_FOUND_ERROR_MESSAGE = 'Session not found',
	NOT_AUTHORIZED_ERROR_MESSAGE = 'Not authorized',

	// Invalid
	INVALID_CREDENTIALS_ERROR_MESSAGE = 'Email or password invalids',
	INVALID_EMAIL_ERROR_MESSAGE = 'Invalid email',
	INVALID_PASSWORD_ERROR_MESSAGE = 'Invalid password',
	INVALID_USERNAME_ERROR_MESSAGE = 'Invalid username',
	INVALID_TOKEN_ERROR_MESSAGE = 'Invalid token',
	EMPTY_FIELD_ERROR_MESSAGE = 'Field cannot be empty',
	PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE = 'Passwords do not match',

	// Validation exists
	USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE = 'This username is already taken',
	EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE = 'Another account already uses this email address',
	MEMBER_ALREADY_EXISTS_ERROR_MESSAGE = 'Member already exists',

	// Forgot Password
	EMAIL_NOT_FOUND_ERROR_MESSAGE = 'This account does not exist. Please try again.',

	// Validation Args
	USERNAME_MUST_BE_LONG_ERROR_MESSAGE = 'The username must be at least 3 character long.',
	PASSWORD_FORMAT_ERROR_MESSAGE = 'The password must have at least 8 characters, one upper case, one lower case, one number and one special character.',
	CONFIRMED_PASSWORD_ERROR_MESSAGE = 'Passwords did not match.'
}
