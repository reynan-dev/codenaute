interface AccountPageProps {
	updateInformationsForm: JSX.Element;
}

export const AccountPage = ({ updateInformationsForm }: AccountPageProps) => {
	return <div className='flex h-full'>{updateInformationsForm}</div>;
};
