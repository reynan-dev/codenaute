import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H1Props {
	children?: string | JSX.Element | never[];
	childrenStyle?: string;
	containerStyle?: string;
}

export const H1 = ({ children, childrenStyle, containerStyle }: H1Props) => {
	return (
		<View className={containerStyle}>
			<Text className={twMerge('text-5xl font-black text-white', childrenStyle)}>{children}</Text>;
		</View>
	);
};
