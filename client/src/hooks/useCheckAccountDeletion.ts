import { useGetQueryParam } from 'hooks/useGetQueryParam';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useCheckAccountDeletion = () => {
	const isAccountDeleted = useGetQueryParam('accountDeleted');

	useEffect(() => {
		if (isAccountDeleted === 'true') {
			toast.success(`Account successfully deleted`);
		}
	}, [isAccountDeleted]);
};
