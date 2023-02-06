import { clsxMerge } from 'helpers/clsxMerge';
import { DetailedHTMLProps, LinkHTMLAttributes, useMemo } from 'react';
import { Link as RouterLink, To } from 'react-router-dom';

type LinkProps = DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> & {
	children: React.ReactNode;
	isLoading?: boolean;
	color?: 'primary' | 'secondary';
	to: To;
};

export const Link: React.FC<LinkProps> = ({ children, className, href, to, color, ...props }) => {
	const style = useMemo(() => {
		return `font-semibold text-${color}`;
	}, [color]);

	return (
		<RouterLink to={to} className={clsxMerge(style, className)}>
			<span className='truncate'>{children}</span>
		</RouterLink>
	);
};
