import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler, useMemo } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

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
		const primaryStyle = twMerge(
			'relative inline-flex items-center justify-center',
			'border-primary bg-primary rounded-full border-2 border-solid font-semibold text-black text-xl',
			'transition ease-in-out duration-150',
			'hover:bg-primary-100 hover:border-primary-100',
			'disabled:border-dark-300 disabled:bg-dark-300 disabled:cursor-not-allowed',
			isLoading && 'disabled:border-primary-200 disabled:bg-primary-200 disabled:cursor-wait',
			size === 'small' ? 'py-2 px-8 text-base w-fit' : 'py-4 px-4 text-xl min-w-56'
		);
		if (designType === 'primary') return primaryStyle;
		const secondaryStyle = twMerge(
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
			<link href={linkUrl} className={twMerge(style, className)}>
				<span className='truncate'>{children}</span>
			</link>
		);
	}

	if (linkUrl !== undefined && designType === 'text') {
		return (
			<link href={linkUrl} className='font-semibold text-primary'>
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
			<button {...props} className={twMerge(style, className)} disabled={isDisabled}>
				<span className='truncate'>{children}</span>
				{renderLoader}
			</button>
		</div>
	);
};
