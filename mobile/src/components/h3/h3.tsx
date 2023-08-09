import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface H3Props {
	children?: string | JSX.Element | never[];
	childrenStyle?: string;
	containerStyle?: string;
}

export const H3 = ({ children, childrenStyle, containerStyle }: H3Props) => {
	return (
		<View className={containerStyle}>
			<Text className={twMerge('text-2xl font-semibold text-white', childrenStyle)}>
				{children}
			</Text>
			;
		</View>
	);
};
