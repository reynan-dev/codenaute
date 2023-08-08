import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H2Props {
	children?: string | JSX.Element | never[];
	childrenStyle?: string;
	containerStyle?: string;
}

export const H2 = ({ children, childrenStyle, containerStyle }: H2Props) => {
	return (
		<View className={containerStyle}>
			<Text className={twMerge('text-4xl font-bold text-white', childrenStyle)}>{children}</Text>;
		</View>
	);
};
