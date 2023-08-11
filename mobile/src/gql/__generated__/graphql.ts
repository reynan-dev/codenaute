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

export type AuthInterface = {
	__typename?: 'AuthInterface';
	cookies: Scalars['String']['output'];
	user: Member;
};

export type Member = {
	__typename?: 'Member';
	createdAt: Scalars['DateTime']['output'];
	email: Scalars['String']['output'];
	id: Scalars['ID']['output'];
	ownedProjects?: Maybe<Array<Project>>;
	sessions?: Maybe<Array<Session>>;
	updatedAt: Scalars['DateTime']['output'];
	username: Scalars['String']['output'];
};

export type Mutation = {
	__typename?: 'Mutation';
	createProject: Project;
	deleteMemberAccount: Member;
	getMemberByEmail: Member;
	signIn: AuthInterface;
	signOut: Scalars['Boolean']['output'];
	signUp: Member;
	updateMemberEmail: Member;
	updateMemberPassword: Member;
	updateMemberUsername: Member;
	updateProject: Project;
	updateProjectIsPublic: Scalars['Boolean']['output'];
};

export type MutationCreateProjectArgs = {
	environment: Scalars['String']['input'];
	files: Scalars['String']['input'];
	isPublic: Scalars['Boolean']['input'];
	mainFile: Scalars['String']['input'];
	memberId: Scalars['String']['input'];
	name: Scalars['String']['input'];
	sandpackTemplate: Scalars['String']['input'];
};

export type MutationDeleteMemberAccountArgs = {
	password: Scalars['String']['input'];
};

export type MutationGetMemberByEmailArgs = {
	email: Scalars['String']['input'];
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
	mainFile: Scalars['String']['input'];
	name: Scalars['String']['input'];
	projectId: Scalars['String']['input'];
	sandpackTemplate: Scalars['String']['input'];
};

export type MutationUpdateProjectIsPublicArgs = {
	environment: Scalars['String']['input'];
	files: Scalars['String']['input'];
	isPublic: Scalars['Boolean']['input'];
	mainFile: Scalars['String']['input'];
	name: Scalars['String']['input'];
	projectId: Scalars['String']['input'];
	sandpackTemplate: Scalars['String']['input'];
};

export type Project = {
	__typename?: 'Project';
	createdAt: Scalars['DateTime']['output'];
	environment: Scalars['String']['output'];
	files: Scalars['String']['output'];
	id: Scalars['ID']['output'];
	isPublic: Scalars['Boolean']['output'];
	mainFile: Scalars['String']['output'];
	name: Scalars['String']['output'];
	owner: Member;
	sandpackTemplate: Scalars['String']['output'];
	updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
	__typename?: 'Query';
	getAllProjectsByOwner: Project;
	getAllPublicProjects: Project;
	getProjectById: Project;
	profile: Member;
};

export type QueryGetProjectByIdArgs = {
	projectId: Scalars['ID']['input'];
};

export type Session = {
	__typename?: 'Session';
	createdAt: Scalars['DateTime']['output'];
	member: Member;
};

export type GetAllPublicProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPublicProjectsQuery = {
	__typename?: 'Query';
	getAllPublicProjects: {
		__typename?: 'Project';
		id: string;
		files: string;
		mainFile: string;
		name: string;
		createdAt: any;
		environment: string;
		sandpackTemplate: string;
		owner: { __typename?: 'Member'; username: string };
	};
};

export const GetAllPublicProjectsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetAllPublicProjects' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getAllPublicProjects' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'files' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mainFile' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'owner' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [{ kind: 'Field', name: { kind: 'Name', value: 'username' } }]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'environment' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'sandpackTemplate' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetAllPublicProjectsQuery, GetAllPublicProjectsQueryVariables>;
