import {
	CONFIRMED_PASSWORD_ERROR_MESSAGE,
	INVALID_EMAIL_ERROR_MESSAGE,
	PASSWORD_FORMAT_ERROR_MESSAGE,
	USERNAME_MUST_BE_LONG_ERROR_MESSAGE
} from 'constants/errorMessages';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from 'constants/validations';

interface InputsValueArg {
	username: string;
	email: string;
	password: string;
	confirmedPassword: string;
}

export const validateForm = (inputsValue: InputsValueArg) => {
	const { username, email, password, confirmedPassword } = inputsValue;
	const errorMessages: { [key: string]: string } = {};

	if (!username.match(USERNAME_REGEX)) errorMessages.username = USERNAME_MUST_BE_LONG_ERROR_MESSAGE;
	if (!email.match(EMAIL_REGEX)) errorMessages.email = INVALID_EMAIL_ERROR_MESSAGE;
	if (!password.match(PASSWORD_REGEX)) errorMessages.password = PASSWORD_FORMAT_ERROR_MESSAGE;
	if (confirmedPassword !== password)
		errorMessages.confirmedPassword = CONFIRMED_PASSWORD_ERROR_MESSAGE;

	return Object.keys(errorMessages).length ? errorMessages : null;
};
