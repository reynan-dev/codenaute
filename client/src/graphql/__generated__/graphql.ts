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

export type FileProject = {
  __typename?: 'FileProject';
  content: Scalars['String'];
  id: Scalars['ID'];
  isHidden: Scalars['Boolean'];
  path: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  email: Scalars['String'];
  favoritedProjects?: Maybe<Array<Project>>;
  followers?: Maybe<Array<Member>>;
  following?: Maybe<Array<Member>>;
  id: Scalars['ID'];
  isValidEmail: Scalars['Boolean'];
  ownedProjects?: Maybe<Array<Project>>;
  projectsInvitedOn?: Maybe<Array<Project>>;
  sessions?: Maybe<Array<Session>>;
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFileProject: FileProject;
  createProgrammingLanguage: ProgrammingLanguage;
  createProjects: Project;
  createSandpackTemplate: SandpackTemplate;
  deleteAccount: Scalars['Boolean'];
  deleteFileProject: FileProject;
  deleteProgrammingLanguage: ProgrammingLanguage;
  deleteProjects: Project;
  deleteSandpackTemplate: SandpackTemplate;
  followMember: Member;
  forgotPassword: RoutingToken;
  getMemberById: Member;
  resetPassword: Member;
  shareProjects: Project;
  signIn: Member;
  signOut: Scalars['Boolean'];
  signUp: Member;
  updateFileProjectCode: FileProject;
  updateFileProjectHidden: FileProject;
  updateFileProjectPath: FileProject;
  updateMemberEmail: Member;
  updateMemberPassword: Member;
  updateMemberUsername: Member;
  updateProgrammingLanguage: ProgrammingLanguage;
  updateProjectsActiveFile: Project;
  updateProjectsIsPublic: Project;
  updateProjectsIsTemplate: Project;
  updateProjectsName: Project;
  updateSandpackTemplate: SandpackTemplate;
  validEmail: RoutingToken;
};


export type MutationCreateFileProjectArgs = {
  content: Scalars['String'];
  isHidden?: InputMaybe<Scalars['Boolean']>;
  path: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationCreateProgrammingLanguageArgs = {
  name: Scalars['String'];
  version: Scalars['String'];
};


export type MutationCreateProjectsArgs = {
  activeFileId?: InputMaybe<Scalars['String']>;
  isPublic: Scalars['Boolean'];
  isTemplate: Scalars['Boolean'];
  languageId: Scalars['String'];
  memberId: Scalars['String'];
  name: Scalars['String'];
  templateId?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSandpackTemplateArgs = {
  slug: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteFileProjectArgs = {
  content: Scalars['String'];
  fileId: Scalars['String'];
};


export type MutationDeleteProgrammingLanguageArgs = {
  languageId: Scalars['String'];
};


export type MutationDeleteProjectsArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteSandpackTemplateArgs = {
  sandpackTemplateId: Scalars['String'];
};


export type MutationFollowMemberArgs = {
  memberId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetMemberByIdArgs = {
  memberId: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationShareProjectsArgs = {
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


export type MutationUpdateFileProjectCodeArgs = {
  content: Scalars['String'];
  fileId: Scalars['String'];
};


export type MutationUpdateFileProjectHiddenArgs = {
  fileId: Scalars['String'];
  isHidden: Scalars['Boolean'];
};


export type MutationUpdateFileProjectPathArgs = {
  fileId: Scalars['String'];
  path: Scalars['String'];
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


export type MutationUpdateProgrammingLanguageArgs = {
  languageId: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['String'];
};


export type MutationUpdateProjectsActiveFileArgs = {
  activeFile: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationUpdateProjectsIsPublicArgs = {
  isPublic: Scalars['Boolean'];
  projectId: Scalars['String'];
};


export type MutationUpdateProjectsIsTemplateArgs = {
  isTemplate: Scalars['Boolean'];
  projectId: Scalars['String'];
};


export type MutationUpdateProjectsNameArgs = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationUpdateSandpackTemplateArgs = {
  sandpackTemplateId: Scalars['String'];
  slug: Scalars['String'];
};


export type MutationValidEmailArgs = {
  id: Scalars['String'];
  token: Scalars['String'];
};

export type ProgrammingLanguage = {
  __typename?: 'ProgrammingLanguage';
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: Project;
  version: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  activeFile?: Maybe<FileProject>;
  editors: Array<Member>;
  favoritedBy?: Maybe<Array<Member>>;
  files?: Maybe<Array<FileProject>>;
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  isTemplate: Scalars['Boolean'];
  name: Scalars['String'];
  owner: Member;
  programmingLanguage: ProgrammingLanguage;
  template?: Maybe<SandpackTemplate>;
};

export type Query = {
  __typename?: 'Query';
  favoriteProject: Project;
  getAllFavoritedProjectsByMember: Project;
  getAllFilesProjectByProjectId: FileProject;
  getAllMembers: Array<Member>;
  getAllProgrammingLanguages: ProgrammingLanguage;
  getAllProjectsByEditor: Project;
  getAllProjectsByOwner: Project;
  getAllProjectsByProgrammingLanguage: Project;
  getAllProjectsByTemplate: Project;
  getAllProjectsPublicProjects: Project;
  getAllSandpackTemplates: SandpackTemplate;
  getFileProjectById: FileProject;
  getProgrammingLanguageById: ProgrammingLanguage;
  getProjectsById: Project;
  getSandpackTemplateById: SandpackTemplate;
  profile: Member;
};


export type QueryFavoriteProjectArgs = {
  projectId: Scalars['String'];
};


export type QueryGetAllFavoritedProjectsByMemberArgs = {
  memberId: Scalars['String'];
};


export type QueryGetAllFilesProjectByProjectIdArgs = {
  projectId: Scalars['String'];
};


export type QueryGetAllProjectsByProgrammingLanguageArgs = {
  languageId: Scalars['String'];
};


export type QueryGetAllProjectsByTemplateArgs = {
  templateId: Scalars['String'];
};


export type QueryGetFileProjectByIdArgs = {
  fileId: Scalars['String'];
};


export type QueryGetProgrammingLanguageByIdArgs = {
  languageId: Scalars['String'];
};


export type QueryGetProjectsByIdArgs = {
  projectId: Scalars['String'];
};


export type QueryGetSandpackTemplateByIdArgs = {
  sandpackTemplateId: Scalars['String'];
};

export type RoutingToken = {
  __typename?: 'RoutingToken';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
};

export type SandpackTemplate = {
  __typename?: 'SandpackTemplate';
  id: Scalars['ID'];
  projects?: Maybe<Array<Project>>;
  slug: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime'];
  member: Member;
};

export type DeleteAccountMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Member', id: string, username: string, email: string } };

export type UpdateEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateMemberEmail: { __typename?: 'Member', email: string, id: string } };

export type UpdatePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  confirmedNewPassword: Scalars['String'];
  oldPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updateMemberPassword: { __typename?: 'Member', id: string, email: string } };

export type UpdateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateMemberUsername: { __typename?: 'Member', username: string, id: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Member', id: string, email: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmedPassword: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Member', id: string, email: string } };


export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const UpdateEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMemberEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmedNewPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMemberPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmedNewPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmedNewPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMemberUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmedPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmedPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmedPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;