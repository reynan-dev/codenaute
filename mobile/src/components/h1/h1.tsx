import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H1Props {
	children?: string | JSX.Element | never[];
	className: string;
}

export const H1 = ({ children, className }: H1Props) => {
	return <Text className={twMerge('h4', className)}>{children}</Text>;
};
