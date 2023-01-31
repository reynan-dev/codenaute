import clsx from 'clsx';
import { clsxMerge } from 'helpers/clsxMerge';
import getBrowserName from 'helpers/getBrowserName';
import React, {
	DetailedHTMLProps,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	useCallback,
	useMemo,
	useState
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label: string;
	error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, label, ...props }, ref?: React.Ref<HTMLInputElement> | undefined) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);
		const [isFocus, setIsFocus] = useState(false);

		const showVisibilitIcon = useCallback(() => {
			const iconProps: IconBaseProps = {
				className: 'mr-2 cursor-pointer absolute right-2',
				size: 20
			};

			return isPasswordVisible ? (
				<button
					className='flex h-full w-full items-center'
					onClick={(event) => {
						event.preventDefault();
						setIsPasswordVisible(!isPasswordVisible);
					}}
				>
					<FiEye {...iconProps} data-testid='visibility-on-icon' />
				</button>
			) : (
				<button
					className='flex h-full w-full items-center'
					onClick={(event) => {
						event.preventDefault();
						setIsPasswordVisible(!isPasswordVisible);
					}}
				>
					<FiEyeOff {...iconProps} data-testid='visibility-off-icon' />
				</button>
			);
		}, [isPasswordVisible]);

		const inputType: HTMLInputTypeAttribute | undefined = useMemo(
			() => (type === 'password' && isPasswordVisible ? 'text' : type),
			[isPasswordVisible, type]
		);

		const browser = getBrowserName();

		return (
			<div className={clsxMerge(className, 'w-full')}>
				<div className='relative h-16 w-full rounded-xl'>
					<div
						className={clsxMerge(
							'absolute top-0 left-0 h-16 w-full rounded-xl',
							isFocus && 'outline-3 outline outline-primary blur-sm',
							isFocus && browser === 'safari' && 'outline-0',
							isFocus && error && 'outline-danger'
						)}
					/>
					<div
						className={clsxMerge(
							'absolute top-0 left-0 flex h-16 w-full items-center justify-between overflow-hidden',
							'rounded-xl border border-dark-500 bg-dark-800 placeholder-primary',
							isFocus && 'border-primary outline outline-1 outline-primary',
							isFocus && browser === 'safari' && 'outline-0',
							error && 'border-danger',
							error && isFocus && 'border-danger outline-danger'
						)}
					>
						<div className='flex w-full items-center'>
							<div className='relative w-full'>
								<input
									name='floating_outlined'
									ref={ref}
									placeholder=' '
									className={clsx(
										'peer block w-full  pl-5 pb-2.5 pt-4',
										'detect-autofill',
										'bg-transparent text-sm',
										'focus:outline-none'
									)}
									{...props}
									type={inputType}
									onFocus={(e) => {
										props.onFocus?.(e);
										setIsFocus(true);
									}}
									onBlur={(e) => {
										props.onBlur?.(e);
										setIsFocus(false);
									}}
								/>
								<label
									htmlFor='floating_outlined'
									className={clsxMerge(
										'absolute top-2.5 left-1 z-10 scale-75 px-2 ',
										'text-md pointer-events-none text-dark-300',
										'origin-[0] -translate-y-4 transform duration-300',
										'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
										'peer-focus:top-2.5 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary',
										error && 'text-danger peer-focus:text-danger'
									)}
								>
									{label}
								</label>
							</div>
							<div className='h-16 w-16'>{type === 'password' && showVisibilitIcon()}</div>
						</div>
					</div>
				</div>

				{error !== undefined && (
					<span
						role='alert'
						className={clsx(
							'mt-2',
							'border-dark-500 bg-transparent text-sm text-danger placeholder-dark-300'
						)}
					>
						{error}
					</span>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
