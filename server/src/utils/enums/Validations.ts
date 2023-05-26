export enum Validations {
	PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
	EMAIL_REGEX = '^[^@]+@[^@]+$',
	USERNAME_REGEX = '^[A-Za-z0-9]{3,16}$',
	PROJECT_NAME_REGEX = '^[A-Za-z0-9_-]{3,30}$',
	MAX_AGE_DAYS = 7
}
