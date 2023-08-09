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

export type AuthInterface = {
	__typename?: 'AuthInterface';
	cookies: Scalars['String'];
	user: Member;
};

export type Member = {
	__typename?: 'Member';
	createdAt: Scalars['DateTime'];
	email: Scalars['String'];
	favoritedProjects?: Maybe<Array<Project>>;
	followers?: Maybe<Array<Member>>;
	following?: Maybe<Array<Member>>;
	id: Scalars['ID'];
	isValidEmail: Scalars['Boolean'];
	ownedProjects?: Maybe<Array<Project>>;
	projectsInvitedOn?: Maybe<Array<Project>>;
	sessions?: Maybe<Array<Session>>;
	updateAt: Scalars['DateTime'];
	username: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	createProject: Project;
	deleteMemberAccount: Scalars['Boolean'];
	deleteProject: Project;
	favoriteProject: Project;
	followMember: Member;
	forgotPassword: RoutingToken;
	resetPassword: Member;
	shareProject: Project;
	signIn: AuthInterface;
	signOut: Scalars['Boolean'];
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
	environment: Scalars['String'];
	files: Scalars['String'];
	isPublic: Scalars['Boolean'];
	isTemplate: Scalars['Boolean'];
	mainFile: Scalars['String'];
	memberId: Scalars['String'];
	name: Scalars['String'];
	sandpackTemplate: Scalars['String'];
};

export type MutationDeleteMemberAccountArgs = {
	password: Scalars['String'];
};

export type MutationDeleteProjectArgs = {
	projectId: Scalars['String'];
};

export type MutationFavoriteProjectArgs = {
	projectId: Scalars['String'];
};

export type MutationFollowMemberArgs = {
	memberId: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
	email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
	confirmPassword: Scalars['String'];
	newPassword: Scalars['String'];
	token: Scalars['String'];
};

export type MutationShareProjectArgs = {
	membersId: Array<Scalars['String']>;
	projectId: Scalars['String'];
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

export type MutationUpdateMemberEmailArgs = {
	email: Scalars['String'];
};

export type MutationUpdateMemberPasswordArgs = {
	confirmedNewPassword: Scalars['String'];
	newPassword: Scalars['String'];
	oldPassword: Scalars['String'];
};

export type MutationUpdateMemberUsernameArgs = {
	username: Scalars['String'];
};

export type MutationUpdateProjectArgs = {
	environment: Scalars['String'];
	files: Scalars['String'];
	isPublic: Scalars['Boolean'];
	isTemplate: Scalars['Boolean'];
	mainFile: Scalars['String'];
	name: Scalars['String'];
	projectId: Scalars['String'];
	sandpackTemplate: Scalars['String'];
};

export type MutationUpdateProjectIsPublicArgs = {
	isPublic: Scalars['Boolean'];
	projectId: Scalars['String'];
};

export type MutationUpdateProjectIsTemplateArgs = {
	isTemplate: Scalars['Boolean'];
	projectId: Scalars['String'];
};

export type MutationUpdateProjectNameArgs = {
	name: Scalars['String'];
	projectId: Scalars['String'];
};

export type MutationValidEmailArgs = {
	token: Scalars['String'];
};

export type Project = {
	__typename?: 'Project';
	createdAt: Scalars['DateTime'];
	editors?: Maybe<Array<Member>>;
	environment: Scalars['String'];
	favoritedBy?: Maybe<Array<Member>>;
	files: Scalars['String'];
	id: Scalars['ID'];
	isPublic: Scalars['Boolean'];
	isTemplate: Scalars['Boolean'];
	mainFile: Scalars['String'];
	name: Scalars['String'];
	owner: Member;
	sandpackTemplate: Scalars['String'];
	updateAt: Scalars['DateTime'];
};

export type Query = {
	__typename?: 'Query';
	getAllFavoritedProjectsByMember: Array<Project>;
	getAllMembers: Array<Member>;
	getAllProjectsByEditor: Array<Project>;
	getAllProjectsByOwner: Array<Project>;
	getAllProjectsByTemplate: Array<Project>;
	getAllPublicProjects: Array<Project>;
	getMemberByEmail: Member;
	getMemberById: Member;
	getProjectById: Project;
	profile: Member;
};

export type QueryGetAllFavoritedProjectsByMemberArgs = {
	memberId: Scalars['String'];
};

export type QueryGetAllProjectsByTemplateArgs = {
	template: Scalars['String'];
};

export type QueryGetMemberByEmailArgs = {
	email: Scalars['String'];
};

export type QueryGetMemberByIdArgs = {
	memberId: Scalars['String'];
};

export type QueryGetProjectByIdArgs = {
	projectId: Scalars['String'];
};

export type RoutingToken = {
	__typename?: 'RoutingToken';
	createdAt: Scalars['DateTime'];
	email: Scalars['String'];
};

export type Session = {
	__typename?: 'Session';
	createdAt: Scalars['DateTime'];
	member: Member;
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
	__typename?: 'Query';
	profile: { __typename?: 'Member'; id: string; username: string; email: string };
};

export type UpdateEmailMutationVariables = Exact<{
	email: Scalars['String'];
}>;

export type UpdateEmailMutation = {
	__typename?: 'Mutation';
	updateMemberEmail: { __typename?: 'Member'; email: string; id: string };
};

export type UpdatePasswordMutationVariables = Exact<{
	newPassword: Scalars['String'];
	confirmedNewPassword: Scalars['String'];
	oldPassword: Scalars['String'];
}>;

export type UpdatePasswordMutation = {
	__typename?: 'Mutation';
	updateMemberPassword: { __typename?: 'Member'; id: string; email: string };
};

export type UpdateUsernameMutationVariables = Exact<{
	username: Scalars['String'];
}>;

export type UpdateUsernameMutation = {
	__typename?: 'Mutation';
	updateMemberUsername: { __typename?: 'Member'; username: string; id: string };
};

export type DeleteAccountMutationVariables = Exact<{
	password: Scalars['String'];
}>;

export type DeleteAccountMutation = { __typename?: 'Mutation'; deleteMemberAccount: boolean };

export type UpdateProjectMutationVariables = Exact<{
	name: Scalars['String'];
	projectId: Scalars['String'];
	isTemplate: Scalars['Boolean'];
	isPublic: Scalars['Boolean'];
	sandpackTemplate: Scalars['String'];
	files: Scalars['String'];
	environment: Scalars['String'];
	mainFile: Scalars['String'];
}>;

export type UpdateProjectMutation = {
	__typename?: 'Mutation';
	updateProject: {
		__typename?: 'Project';
		name: string;
		isTemplate: boolean;
		isPublic: boolean;
		id: string;
		files: string;
		sandpackTemplate: string;
		environment: string;
		mainFile: string;
		owner: { __typename?: 'Member'; username: string; id: string };
	};
};

export type GetProjectByIdQueryVariables = Exact<{
	projectId: Scalars['String'];
}>;

export type GetProjectByIdQuery = {
	__typename?: 'Query';
	getProjectById: {
		__typename?: 'Project';
		name: string;
		isTemplate: boolean;
		id: string;
		isPublic: boolean;
		files: string;
		sandpackTemplate: string;
		environment: string;
		mainFile: string;
		owner: { __typename?: 'Member'; id: string };
	};
};

export type CreateProjectMutationVariables = Exact<{
	name: Scalars['String'];
	memberId: Scalars['String'];
	isTemplate: Scalars['Boolean'];
	isPublic: Scalars['Boolean'];
	sandpackTemplate: Scalars['String'];
	files: Scalars['String'];
	environment: Scalars['String'];
	mainFile: Scalars['String'];
}>;

export type CreateProjectMutation = {
	__typename?: 'Mutation';
	createProject: {
		__typename?: 'Project';
		id: string;
		name: string;
		files: string;
		environment: string;
		mainFile: string;
		isTemplate: boolean;
		isPublic: boolean;
		sandpackTemplate: string;
		owner: { __typename?: 'Member'; id: string };
	};
};

export type UpdateProjectIsPublicMutationVariables = Exact<{
	isPublic: Scalars['Boolean'];
	projectId: Scalars['String'];
}>;

export type UpdateProjectIsPublicMutation = {
	__typename?: 'Mutation';
	updateProjectIsPublic: { __typename?: 'Project'; id: string; isPublic: boolean };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation'; signOut: boolean };

export type GetAllProjectsByOwnerQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProjectsByOwnerQuery = {
	__typename?: 'Query';
	getAllProjectsByOwner: Array<{
		__typename?: 'Project';
		files: string;
		mainFile: string;
		sandpackTemplate: string;
		name: string;
		id: string;
		owner: { __typename?: 'Member'; email: string; id: string; username: string };
	}>;
};

export type SignInMutationVariables = Exact<{
	email: Scalars['String'];
	password: Scalars['String'];
}>;

export type SignInMutation = {
	__typename?: 'Mutation';
	signIn: {
		__typename?: 'AuthInterface';
		cookies: string;
		user: { __typename?: 'Member'; id: string; username: string; email: string };
	};
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
export const UpdateEmailDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateEmail' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
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
						name: { kind: 'Name', value: 'updateMemberEmail' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'email' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdatePasswordDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdatePassword' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'confirmedNewPassword' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'oldPassword' } },
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
						name: { kind: 'Name', value: 'updateMemberPassword' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'newPassword' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'newPassword' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'confirmedNewPassword' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'confirmedNewPassword' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'oldPassword' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'oldPassword' } }
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
} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUsernameDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateUsername' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'username' } },
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
						name: { kind: 'Name', value: 'updateMemberUsername' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'username' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'username' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'username' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const DeleteAccountDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteAccount' },
			variableDefinitions: [
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
						name: { kind: 'Name', value: 'deleteMemberAccount' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
							}
						]
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const UpdateProjectDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateProject' },
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectId' } },
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'mainFile' } },
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
						name: { kind: 'Name', value: 'updateProject' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'name' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'projectId' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'projectId' } }
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
								name: { kind: 'Name', value: 'mainFile' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'mainFile' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'owner' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'username' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } }
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isTemplate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isPublic' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'files' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'sandpackTemplate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'environment' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mainFile' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const GetProjectByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetProjectById' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectId' } },
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
						name: { kind: 'Name', value: 'getProjectById' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'projectId' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'projectId' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'owner' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isTemplate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isPublic' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'files' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'sandpackTemplate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'environment' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mainFile' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'mainFile' } },
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
								name: { kind: 'Name', value: 'mainFile' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'mainFile' } }
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
								{ kind: 'Field', name: { kind: 'Name', value: 'environment' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mainFile' } },
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
export const UpdateProjectIsPublicDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateProjectIsPublic' },
			variableDefinitions: [
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'projectId' } },
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
						name: { kind: 'Name', value: 'updateProjectIsPublic' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'isPublic' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'isPublic' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'projectId' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'projectId' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'isPublic' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateProjectIsPublicMutation, UpdateProjectIsPublicMutationVariables>;
export const SignOutDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'SignOut' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [{ kind: 'Field', name: { kind: 'Name', value: 'signOut' } }]
			}
		}
	]
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const GetAllProjectsByOwnerDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetAllProjectsByOwner' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getAllProjectsByOwner' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'owner' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'username' } }
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'files' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mainFile' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'sandpackTemplate' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetAllProjectsByOwnerQuery, GetAllProjectsByOwnerQueryVariables>;
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
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'username' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } }
										]
									}
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'cookies' } }
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
