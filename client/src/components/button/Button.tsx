import { clsxMerge } from 'helpers/clsxMerge';
import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	children: React.ReactNode;
	isLoading?: boolean;
	size?: 'medium' | 'small';
} & (
		| {
				designType?: 'primary';
				disabled?: boolean;
		  }
		| { designType?: 'secondary' | 'text'; disabled?: never }
	) &
	(
		| {
				type: 'submit';
				linkUrl?: never;
				onClick?: never;
		  }
		| {
				onClick?: never;
				linkUrl: HTMLLinkElement['href'] | undefined;
		  }
		| {
				onClick: MouseEventHandler<HTMLButtonElement>;
				linkUrl?: never;
		  }
	);

export const Button: React.FC<ButtonProps> = ({
	children,
	className,
	isLoading,
	disabled,
	designType = 'primary',
	size = 'medium',
	linkUrl,
	...props
}) => {
	const style = useMemo(() => {
		const primaryStyle = clsxMerge(
			'relative inline-flex min-w-56 items-center justify-center',
			'border-primary bg-primary rounded-full border-2 border-solid font-semibold text-black text-xl',
			'transition ease-in-out duration-150',
			'hover:bg-primary-100 hover:border-primary-100',
			'disabled:border-dark-300 disabled:bg-dark-300',
			isLoading && 'disabled:border-primary-200 disabled:bg-primary-200',
			size === 'small' ? 'py-2 px-4 text-lg' : 'py-4 px-4 text-xl'
		);
		if (designType === 'primary') return primaryStyle;
		const secondaryStyle = clsxMerge(
			primaryStyle,
			'bg-transparent text-primary border-primary',
			'hover:bg-primary hover:border-primary hover:text-black',
			isLoading && 'disabled:bg-primary-200 disabled:border-primary-200 disabled:text-white'
		);
		return secondaryStyle;
	}, [designType, isLoading, size]);

	const renderLoader = useMemo(() => {
		if (!isLoading) return;
		return (
			<div className='absolute right-4 inline-flex animate-spin items-center self-center'>
				<BiLoaderAlt />
			</div>
		);
	}, [isLoading]);

	const isDisabled = useMemo(
		() => isLoading || (disabled && designType === 'primary'),
		[isLoading, disabled, designType]
	);

	if (linkUrl !== undefined) {
		return (
			<link href={linkUrl} className={clsxMerge(style, className)}>
				<span className='truncate'>{children}</span>
			</link>
		);
	}

	if (designType === 'text') {
		return (
			<button {...props} className='font-semibold text-primary'>
				{children}
			</button>
		);
	}

	return (
		<div>
			<button {...props} className={clsxMerge(style, className)} disabled={isDisabled}>
				<span className='truncate'>{children}</span>
				{renderLoader}
			</button>
		</div>
	);
};
