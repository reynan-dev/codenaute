import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H4Props {
	children?: string | JSX.Element | never[];
	childrenStyle?: string;
	containerStyle?: string;
}

export const H4 = ({ children, childrenStyle, containerStyle }: H4Props) => {
	return (
		<View className={containerStyle}>
			<Text className={twMerge('text-xl font-semibold text-white', childrenStyle)}>{children}</Text>
		</View>
	);
};
