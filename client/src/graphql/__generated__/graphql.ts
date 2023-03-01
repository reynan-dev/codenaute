/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: any;
};

export type Member = {
	__typename?: 'Member';
	email: Scalars['String'];
	id: Scalars['ID'];
	username: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	deleteAccount: Member;
	forgotPassword: RoutingToken;
	resetPassword: Member;
	signIn: Member;
	signOut: Scalars['Boolean'];
	signUp: Member;
	updateEmail: Member;
	updatePassword: Member;
	updateUsername: Member;
	validEmail: RoutingToken;
};

export type MutationDeleteAccountArgs = {
	password: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
	email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
	confirmPassword: Scalars['String'];
	newPassword: Scalars['String'];
	token: Scalars['String'];
};

export type MutationSignInArgs = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type MutationSignUpArgs = {
	confirmedPassword: Scalars['String'];
	email: Scalars['String'];
	password: Scalars['String'];
	username: Scalars['String'];
};

export type MutationUpdateEmailArgs = {
	email: Scalars['String'];
};

export type MutationUpdatePasswordArgs = {
	confirmPassword: Scalars['String'];
	newPassword: Scalars['String'];
	oldPassword: Scalars['String'];
};

export type MutationUpdateUsernameArgs = {
	username: Scalars['String'];
};

export type MutationValidEmailArgs = {
	id: Scalars['String'];
	token: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	profile: Member;
};

export type RoutingToken = {
	__typename?: 'RoutingToken';
	createdAt: Scalars['DateTime'];
	email: Scalars['String'];
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
	__typename?: 'Query';
	profile: { __typename?: 'Member'; id: string; username: string; email: string };
};

export type SignInMutationVariables = Exact<{
	email: Scalars['String'];
	password: Scalars['String'];
}>;

export type SignInMutation = {
	__typename?: 'Mutation';
	signIn: { __typename?: 'Member'; id: string; email: string };
};

export type SignUpMutationVariables = Exact<{
	username: Scalars['String'];
	email: Scalars['String'];
	password: Scalars['String'];
	confirmedPassword: Scalars['String'];
}>;

export type SignUpMutation = {
	__typename?: 'Mutation';
	signUp: { __typename?: 'Member'; id: string; email: string };
};

export const ProfileDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Profile' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'profile' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'username' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const SignInDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'SignIn' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'signIn' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'email' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'SignUp' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'confirmedPassword' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'signUp' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'username' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'email' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'confirmedPassword' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'confirmedPassword' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
