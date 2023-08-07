import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface PProps {
	children?: string | JSX.Element | never[] | JSX.Element[];
	className?: string;
}

export const P = ({ children, className }: PProps) => {
	return <Text className={twMerge('p', className)}>{children}</Text>;
};
