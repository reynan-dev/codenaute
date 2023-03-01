
interface AccountPageProps {
	updateInformationsForm: JSX.Element;
}

export default function AccountPage({ updateInformationsForm }: AccountPageProps) {
	return (
		<div className='flex h-full'>
			{updateInformationsForm}
		</div>
	);
}
