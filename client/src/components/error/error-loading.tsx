interface ErrorLoadingProps {
	errorMessage: string;
	icon: JSX.Element;
}

export const ErrorLoading = ({ errorMessage, icon }: ErrorLoadingProps) => {
	return (
		<h3 className='flex h-full w-full items-center justify-center'>
			<span className='mr-4 text-danger'>{icon}</span>
			{errorMessage}
		</h3>
	);
};
