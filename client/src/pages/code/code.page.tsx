import Loader from "components/svgs/loader";

export interface CodePageProps {}

export const CodePage = ({}: CodePageProps) => {
	return <div className='flex py-3 px-5'>
		<Loader />
	</div>;
};
