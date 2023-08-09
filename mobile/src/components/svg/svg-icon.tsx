import { AstroIcon } from 'components/svg/paths/astro-icon';
import { JestIcon } from 'components/svg/paths/jest-icon';
import { NextJsIcon } from 'components/svg/paths/nextjs-icon';
import { SolidJsIcon } from 'components/svg/paths/solidjs-icon';
import { SvelteIcon } from 'components/svg/paths/svelte-icon';
import { ViteIcon } from 'components/svg/paths/vite-icon';
import { Svg } from 'react-native-svg';

interface SvgIconProps {
	name: string;
	tailwind?: string;
	size?: number;
	color?: string;
}

export const SvgIcon = ({ name, tailwind, size = 16, color }: SvgIconProps) => {
	const renderPath = () => {
		if (name === 'astro') return <AstroIcon />;
		if (name === 'jest') return <JestIcon />;
		if (name === 'nextjs') return <NextJsIcon />;
		if (name === 'solidjs') return <SolidJsIcon />;
		if (name === 'svelte') return <SvelteIcon />;
		if (name === 'vite') return <ViteIcon />;
	};

	return (
		<Svg
			width={size}
			height={size}
			fill={color !== undefined ? color : 'currentColor'}
			stroke={color !== undefined ? color : 'currentColor'}
			strokeWidth={0}
			className={tailwind}
			viewBox='0 0 24 24'
		>
			{renderPath()}
		</Svg>
	);
};
