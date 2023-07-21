import { useMutation } from '@apollo/client';
import { SIGN_IN_PATH } from 'constants/paths';
import AuthContext from 'context/auth/auth.context';
import { SignOutMutation, SignOutMutationVariables } from 'graphql/__generated__/graphql';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { SIGN_OUT_MUTATION } from 'pages/home/home.graphql';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useOnSignOutSuccess = () => {
	const navigate = useNavigate();

	const { refetch: refetchProfile } = useContext(AuthContext);

	const onSignOutSuccess = async () => {
		try {
			await refetchProfile();
		} finally {
			localStorage.removeItem('cookies');
			navigate(SIGN_IN_PATH);
			toast.success(`You successfully signed out`);
		}
	};

	return { onSignOutSuccess };
};

export const useSignOut = () => {
	const { onSignOutSuccess } = useOnSignOutSuccess();

	const [signOutMutation, { loading }] = useMutation<SignOutMutation, SignOutMutationVariables>(
		SIGN_OUT_MUTATION,
		{
			onCompleted: async () => {
				await onSignOutSuccess();
			}
		}
	);

	const signOut = async () => {
		try {
			await signOutMutation();
		} catch (error) {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
		return;
	};

	return { loading, signOut };
};
