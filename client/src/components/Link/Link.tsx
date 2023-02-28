import { DetailedHTMLProps, LinkHTMLAttributes, useMemo } from 'react';
import { Link as RouterLink, To } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type LinkProps = DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> & {
	children: React.ReactNode;
	isLoading?: boolean;
	color?: 'primary' | 'secondary';
	to: To;
};

export const Link: React.FC<LinkProps> = ({ children, className, to, color }) => {
	const style = useMemo(() => {
		return `font-semibold text-${color}`;
	}, [color]);

	return (
		<RouterLink to={to} className={twMerge(style, className)}>
			<span className='truncate'>{children}</span>
		</RouterLink>
	);
};
