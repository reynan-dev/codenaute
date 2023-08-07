import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H2Props {
	children?: string | JSX.Element | never[];
	className?: string;
}

export const H2 = ({ children, className }: H2Props) => {
	return <Text className={twMerge('h2', className)}>{children}</Text>;
};
