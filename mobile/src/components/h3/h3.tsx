import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H3Props {
	children?: string | JSX.Element | never[];
	className?: string;
}

export const H3 = ({ children, className }: H3Props) => {
	return <Text className={twMerge('h3', className)}>{children}</Text>;
};
