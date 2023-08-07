import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H4Props {
	children?: string | JSX.Element | never[];
	className?: string;
}

export const H4 = ({ children, className }: H4Props) => {
	return <Text className={twMerge('h4', className)}>{children}</Text>;
};
