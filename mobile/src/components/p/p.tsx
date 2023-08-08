import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface PProps {
	children?: string | JSX.Element | never[] | JSX.Element[];
	childrenStyle?: string;
	containerStyle?: string;
}

export const P = ({ children, childrenStyle, containerStyle }: PProps) => {
	return (
		<View className={containerStyle}>
			<Text className={twMerge('text-base text-white', childrenStyle)}>{children}</Text>
		</View>
	);
};
