/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: { input: any; output: any };
};

export type Member = {
	__typename?: 'Member';
	email: Scalars['String']['output'];
	favoritedProjects?: Maybe<Array<Project>>;
	followers?: Maybe<Array<Member>>;
	following?: Maybe<Array<Member>>;
	id: Scalars['ID']['output'];
	isValidEmail: Scalars['Boolean']['output'];
	ownedProjects?: Maybe<Array<Project>>;
	projectsInvitedOn?: Maybe<Array<Project>>;
	sessions?: Maybe<Array<Session>>;
	username: Scalars['String']['output'];
};

export type Mutation = {
	__typename?: 'Mutation';
	createProject: Project;
	deleteMemberAccount: Member;
	deleteProject: Project;
	favoriteProject: Project;
	followMember: Member;
	forgotPassword: RoutingToken;
	resetPassword: Member;
	shareProject: Project;
	signIn: Member;
	signOut: Scalars['Boolean']['output'];
	signUp: Member;
	updateMemberEmail: Member;
	updateMemberPassword: Member;
	updateMemberUsername: Member;
	updateProject: Project;
	updateProjectIsPublic: Project;
	updateProjectIsTemplate: Project;
	updateProjectName: Project;
	validEmail: RoutingToken;
};

export type MutationCreateProjectArgs = {
	environment: Scalars['String']['input'];
	files: Scalars['String']['input'];
	isPublic: Scalars['Boolean']['input'];
	isTemplate: Scalars['Boolean']['input'];
	main: Scalars['String']['input'];
	memberId: Scalars['String']['input'];
	name: Scalars['String']['input'];
	sandpackTemplate: Scalars['String']['input'];
};

export type MutationDeleteMemberAccountArgs = {
	password: Scalars['String']['input'];
};

export type MutationDeleteProjectArgs = {
	projectId: Scalars['String']['input'];
};

export type MutationFavoriteProjectArgs = {
	projectId: Scalars['String']['input'];
};

export type MutationFollowMemberArgs = {
	memberId: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
	email: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
	confirmPassword: Scalars['String']['input'];
	newPassword: Scalars['String']['input'];
	token: Scalars['String']['input'];
};

export type MutationShareProjectArgs = {
	membersId: Array<Scalars['String']['input']>;
	projectId: Scalars['String']['input'];
};

export type MutationSignInArgs = {
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
};

export type MutationSignUpArgs = {
	confirmedPassword: Scalars['String']['input'];
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
	username: Scalars['String']['input'];
};

export type MutationUpdateMemberEmailArgs = {
	email: Scalars['String']['input'];
};

export type MutationUpdateMemberPasswordArgs = {
	confirmedNewPassword: Scalars['String']['input'];
	newPassword: Scalars['String']['input'];
	oldPassword: Scalars['String']['input'];
};

export type MutationUpdateMemberUsernameArgs = {
	username: Scalars['String']['input'];
};

export type MutationUpdateProjectArgs = {
	environment: Scalars['String']['input'];
	files: Scalars['String']['input'];
	isPublic: Scalars['Boolean']['input'];
	isTemplate: Scalars['Boolean']['input'];
	main: Scalars['String']['input'];
	name: Scalars['String']['input'];
	projectId: Scalars['String']['input'];
	sandpackTemplate: Scalars['String']['input'];
};

export type MutationUpdateProjectIsPublicArgs = {
	isPublic: Scalars['Boolean']['input'];
	projectId: Scalars['String']['input'];
};

export type MutationUpdateProjectIsTemplateArgs = {
	isTemplate: Scalars['Boolean']['input'];
	projectId: Scalars['String']['input'];
};

export type MutationUpdateProjectNameArgs = {
	name: Scalars['String']['input'];
	projectId: Scalars['String']['input'];
};

export type MutationValidEmailArgs = {
	token: Scalars['String']['input'];
};

export type Project = {
	__typename?: 'Project';
	editors?: Maybe<Array<Member>>;
	environment: Scalars['String']['output'];
	favoritedBy?: Maybe<Array<Member>>;
	files: Scalars['String']['output'];
	id: Scalars['ID']['output'];
	isPublic: Scalars['Boolean']['output'];
	isTemplate: Scalars['Boolean']['output'];
	main: Scalars['String']['output'];
	name: Scalars['String']['output'];
	owner: Member;
	sandpackTemplate: Scalars['String']['output'];
};

export type Query = {
	__typename?: 'Query';
	getAllFavoritedProjectsByMember: Project;
	getAllMembers: Array<Member>;
	getAllProjectsByEditor: Project;
	getAllProjectsByOwner: Array<Project>;
	getAllProjectsByTemplate: Project;
	getAllProjectsPublicProjects: Project;
	getMemberByEmail: Member;
	getMemberById: Member;
	getProjectById: Project;
	profile: Member;
};

export type QueryGetAllFavoritedProjectsByMemberArgs = {
	memberId: Scalars['String']['input'];
};

export type QueryGetAllProjectsByTemplateArgs = {
	template: Scalars['String']['input'];
};

export type QueryGetMemberByEmailArgs = {
	email: Scalars['String']['input'];
};

export type QueryGetMemberByIdArgs = {
	memberId: Scalars['String']['input'];
};

export type QueryGetProjectByIdArgs = {
	projectId: Scalars['String']['input'];
};

export type RoutingToken = {
	__typename?: 'RoutingToken';
	createdAt: Scalars['DateTime']['output'];
	email: Scalars['String']['output'];
};

export type Session = {
	__typename?: 'Session';
	createdAt: Scalars['DateTime']['output'];
	member: Member;
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
	__typename?: 'Query';
	profile: { __typename?: 'Member'; id: string; username: string; email: string };
};

export type CreateProjectMutationVariables = Exact<{
	name: Scalars['String']['input'];
	memberId: Scalars['String']['input'];
	isTemplate: Scalars['Boolean']['input'];
	isPublic: Scalars['Boolean']['input'];
	sandpackTemplate: Scalars['String']['input'];
	files: Scalars['String']['input'];
	environment: Scalars['String']['input'];
	main: Scalars['String']['input'];
}>;

export type CreateProjectMutation = {
	__typename?: 'Mutation';
	createProject: {
		__typename?: 'Project';
		id: string;
		name: string;
		files: string;
		isTemplate: boolean;
		isPublic: boolean;
		sandpackTemplate: string;
		owner: { __typename?: 'Member'; id: string };
	};
};

export type GetAllMembersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllMembersQuery = {
	__typename?: 'Query';
	getAllMembers: Array<{ __typename?: 'Member'; email: string; username: string }>;
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
export const CreateProjectDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'CreateProject' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'isTemplate' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'isPublic' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'sandpackTemplate' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'files' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'environment' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'main' } },
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
						name: { kind: 'Name', value: 'createProject' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'name' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'memberId' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'memberId' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'isTemplate' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'isTemplate' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'isPublic' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'isPublic' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'sandpackTemplate' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'sandpackTemplate' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'files' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'files' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'environment' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'environment' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'main' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'main' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'owner' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'files' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isTemplate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isPublic' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'sandpackTemplate' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetAllMembersDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetAllMembers' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getAllMembers' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'username' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetAllMembersQuery, GetAllMembersQueryVariables>;
