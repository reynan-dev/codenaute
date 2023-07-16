import { registerDecorator } from 'class-validator';

export const IsSandpackFiles = () => {
	return (object: any, propertyName: string) => {
		registerDecorator({
			name: 'isSandpackFiles',
			target: object.constructor,
			propertyName: propertyName,
			validator: {
				validate(value: any) {
					if (!value || typeof value !== 'object') {
						return false;
					}

					for (const key in value) {
						const file = value[key];
						if (!file || (typeof file !== 'string' && typeof file !== 'object')) {
							return false;
						}
					}

					return true;
				},
				defaultMessage() {
					return 'Invalid SandpackFiles object';
				}
			}
		});
	};
};
