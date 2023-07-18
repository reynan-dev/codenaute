import { useMutation } from '@apollo/client';
import { SIGN_UP_PATH } from 'constants/paths';
import AuthContext from 'context/auth/auth.context';
import {
	DeleteAccountMutation,
	DeleteAccountMutationVariables,
	UpdateEmailMutation,
	UpdateEmailMutationVariables,
	UpdatePasswordMutation,
	UpdatePasswordMutationVariables,
	UpdateUsernameMutation,
	UpdateUsernameMutationVariables
} from 'graphql/__generated__/graphql';
import { areSameValues } from 'helpers/are-same-values';
import { getGraphQLErrorMessage } from 'helpers/get-graphql-error-message';
import { InformationsStateForm, PasswordFormState } from 'pages/account/account.container';
import {
	DELETE_ACCOUNT_MUTATION,
	UPDATE_EMAIL_MUTATION,
	UPDATE_PASSWORD_MUTATION,
	UPDATE_USERNAME_MUTATION
} from 'pages/account/account.graphql';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useDeleteAccountService = (password: string) => {
	const navigate = useNavigate();
	const { refetch: refetchProfile } = useContext(AuthContext);

	const [deleteAccount, { loading }] = useMutation<
		DeleteAccountMutation,
		DeleteAccountMutationVariables
	>(DELETE_ACCOUNT_MUTATION, {
		onCompleted: async () => {
			try {
				await refetchProfile();
			} finally {
				navigate(SIGN_UP_PATH);
				toast.success(`Account successfully deleted`);
			}
		},
		onError: (error) => {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	});

	return { loading, deleteAccount };
};

export const useUpdateEmailService = () => {
	const [updateEmail, { loading }] = useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(
		UPDATE_EMAIL_MUTATION
	);

	return { loading, updateEmail };
};

export const useUpdatePasswordService = (state: PasswordFormState) => {
	const [updatePassword, { loading }] = useMutation<
		UpdatePasswordMutation,
		UpdatePasswordMutationVariables
	>(UPDATE_PASSWORD_MUTATION, {
		onCompleted: () => {
			toast.success(`Password successfully changed`);
			state.setNewPassword('');
			state.setConfirmedNewPassword('');
			state.setOldPassword('');
		},
		onError: (error) => {
			toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
		}
	});

	return { loading, updatePassword };
};

export const useUpdateUsernameService = () => {
	const [updateUsername, { loading }] = useMutation<
		UpdateUsernameMutation,
		UpdateUsernameMutationVariables
	>(UPDATE_USERNAME_MUTATION);

	return { loading, updateUsername };
};

export const useUpdateInformations = () => {
	const { profile: profileData, refetch: refetchProfile } = useContext(AuthContext);
	const initialEmail = profileData?.profile.email;
	const initialUsername = profileData?.profile.username;

	const { updateEmail, loading: updateEmailLoading } = useUpdateEmailService();
	const { updateUsername, loading: updateUsernameLoading } = useUpdateUsernameService();

	const updateInformations = async (state: InformationsStateForm) => {
		if (state.newEmail && state.newUsername) {
			try {
				if (!areSameValues({ email: initialEmail }, { email: state.newEmail })) {
					await updateEmail({
						variables: { email: state.newEmail }
					});
				}
				if (!areSameValues({ username: initialUsername }, { username: state.newUsername })) {
					await updateUsername({
						variables: { username: state.newUsername }
					});
				}
				toast.success(`Informations successfully saved`);
				refetchProfile();
			} catch (error) {
				toast.error(getGraphQLErrorMessage(error), { autoClose: 10000 });
			}
		}
	};

	return { updateInformations, updateEmailLoading, updateUsernameLoading };
};
