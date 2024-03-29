/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
	'\n\tquery Profile {\n\t\tprofile {\n\t\t\tid\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n':
		types.ProfileDocument,
	'\n\tmutation UpdateEmail($email: String!) {\n\t\tupdateMemberEmail(email: $email) {\n\t\t\temail\n\t\t\tid\n\t\t}\n\t}\n':
		types.UpdateEmailDocument,
	'\n\tmutation UpdatePassword(\n\t\t$newPassword: String!\n\t\t$confirmedNewPassword: String!\n\t\t$oldPassword: String!\n\t) {\n\t\tupdateMemberPassword(\n\t\t\tnewPassword: $newPassword\n\t\t\tconfirmedNewPassword: $confirmedNewPassword\n\t\t\toldPassword: $oldPassword\n\t\t) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n':
		types.UpdatePasswordDocument,
	'\n\tmutation UpdateUsername($username: String!) {\n\t\tupdateMemberUsername(username: $username) {\n\t\t\tusername\n\t\t\tid\n\t\t}\n\t}\n':
		types.UpdateUsernameDocument,
	'\n\tmutation DeleteAccount($password: String!) {\n\t\tdeleteMemberAccount(password: $password)\n\t}\n':
		types.DeleteAccountDocument,
	'\n\tmutation UpdateProject(\n\t\t$name: String!\n\t\t$projectId: String!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$mainFile: String!\n\t) {\n\t\tupdateProject(\n\t\t\tname: $name\n\t\t\tprojectId: $projectId\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmainFile: $mainFile\n\t\t) {\n\t\t\towner {\n\t\t\t\tusername\n\t\t\t\tid\n\t\t\t}\n\t\t\tname\n\t\t\tisPublic\n\t\t\tid\n\t\t\tfiles\n\t\t\tsandpackTemplate\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t}\n\t}\n':
		types.UpdateProjectDocument,
	'\n\tquery GetProjectById($projectId: String!) {\n\t\tgetProjectById(projectId: $projectId) {\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tname\n\t\t\tid\n\t\t\tisPublic\n\t\t\tfiles\n\t\t\tsandpackTemplate\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t}\n\t}\n':
		types.GetProjectByIdDocument,
	'\n\tmutation CreateProject(\n\t\t$name: String!\n\t\t$memberId: String!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$mainFile: String!\n\t) {\n\t\tcreateProject(\n\t\t\tname: $name\n\t\t\tmemberId: $memberId\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmainFile: $mainFile\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tfiles\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t\tisPublic\n\t\t\tsandpackTemplate\n\t\t}\n\t}\n':
		types.CreateProjectDocument,
	'\n\tmutation SignOut {\n\t\tsignOut\n\t}\n': types.SignOutDocument,
	'\n\tquery GetAllProjectsByOwner {\n\t\tgetAllProjectsByOwner {\n\t\t\towner {\n\t\t\t\temail\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t}\n\t\t\tfiles\n\t\t\tmainFile\n\t\t\tsandpackTemplate\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n':
		types.GetAllProjectsByOwnerDocument,
	'\n\tmutation SignIn($email: String!, $password: String!) {\n\t\tsignIn(email: $email, password: $password) {\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t\tcookies\n\t\t}\n\t}\n':
		types.SignInDocument,
	'\n\tmutation SignUp(\n\t\t$username: String!\n\t\t$email: String!\n\t\t$password: String!\n\t\t$confirmedPassword: String!\n\t) {\n\t\tsignUp(\n\t\t\tusername: $username\n\t\t\temail: $email\n\t\t\tpassword: $password\n\t\t\tconfirmedPassword: $confirmedPassword\n\t\t) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n':
		types.SignUpDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tquery Profile {\n\t\tprofile {\n\t\t\tid\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery Profile {\n\t\tprofile {\n\t\t\tid\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation UpdateEmail($email: String!) {\n\t\tupdateMemberEmail(email: $email) {\n\t\t\temail\n\t\t\tid\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdateEmail($email: String!) {\n\t\tupdateMemberEmail(email: $email) {\n\t\t\temail\n\t\t\tid\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation UpdatePassword(\n\t\t$newPassword: String!\n\t\t$confirmedNewPassword: String!\n\t\t$oldPassword: String!\n\t) {\n\t\tupdateMemberPassword(\n\t\t\tnewPassword: $newPassword\n\t\t\tconfirmedNewPassword: $confirmedNewPassword\n\t\t\toldPassword: $oldPassword\n\t\t) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdatePassword(\n\t\t$newPassword: String!\n\t\t$confirmedNewPassword: String!\n\t\t$oldPassword: String!\n\t) {\n\t\tupdateMemberPassword(\n\t\t\tnewPassword: $newPassword\n\t\t\tconfirmedNewPassword: $confirmedNewPassword\n\t\t\toldPassword: $oldPassword\n\t\t) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation UpdateUsername($username: String!) {\n\t\tupdateMemberUsername(username: $username) {\n\t\t\tusername\n\t\t\tid\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdateUsername($username: String!) {\n\t\tupdateMemberUsername(username: $username) {\n\t\t\tusername\n\t\t\tid\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation DeleteAccount($password: String!) {\n\t\tdeleteMemberAccount(password: $password)\n\t}\n'
): (typeof documents)['\n\tmutation DeleteAccount($password: String!) {\n\t\tdeleteMemberAccount(password: $password)\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation UpdateProject(\n\t\t$name: String!\n\t\t$projectId: String!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$mainFile: String!\n\t) {\n\t\tupdateProject(\n\t\t\tname: $name\n\t\t\tprojectId: $projectId\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmainFile: $mainFile\n\t\t) {\n\t\t\towner {\n\t\t\t\tusername\n\t\t\t\tid\n\t\t\t}\n\t\t\tname\n\t\t\tisPublic\n\t\t\tid\n\t\t\tfiles\n\t\t\tsandpackTemplate\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdateProject(\n\t\t$name: String!\n\t\t$projectId: String!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$mainFile: String!\n\t) {\n\t\tupdateProject(\n\t\t\tname: $name\n\t\t\tprojectId: $projectId\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmainFile: $mainFile\n\t\t) {\n\t\t\towner {\n\t\t\t\tusername\n\t\t\t\tid\n\t\t\t}\n\t\t\tname\n\t\t\tisPublic\n\t\t\tid\n\t\t\tfiles\n\t\t\tsandpackTemplate\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tquery GetProjectById($projectId: String!) {\n\t\tgetProjectById(projectId: $projectId) {\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tname\n\t\t\tid\n\t\t\tisPublic\n\t\t\tfiles\n\t\t\tsandpackTemplate\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetProjectById($projectId: String!) {\n\t\tgetProjectById(projectId: $projectId) {\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tname\n\t\t\tid\n\t\t\tisPublic\n\t\t\tfiles\n\t\t\tsandpackTemplate\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation CreateProject(\n\t\t$name: String!\n\t\t$memberId: String!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$mainFile: String!\n\t) {\n\t\tcreateProject(\n\t\t\tname: $name\n\t\t\tmemberId: $memberId\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmainFile: $mainFile\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tfiles\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t\tisPublic\n\t\t\tsandpackTemplate\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation CreateProject(\n\t\t$name: String!\n\t\t$memberId: String!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$mainFile: String!\n\t) {\n\t\tcreateProject(\n\t\t\tname: $name\n\t\t\tmemberId: $memberId\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmainFile: $mainFile\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tfiles\n\t\t\tenvironment\n\t\t\tmainFile\n\t\t\tisPublic\n\t\t\tsandpackTemplate\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation SignOut {\n\t\tsignOut\n\t}\n'
): (typeof documents)['\n\tmutation SignOut {\n\t\tsignOut\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tquery GetAllProjectsByOwner {\n\t\tgetAllProjectsByOwner {\n\t\t\towner {\n\t\t\t\temail\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t}\n\t\t\tfiles\n\t\t\tmainFile\n\t\t\tsandpackTemplate\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetAllProjectsByOwner {\n\t\tgetAllProjectsByOwner {\n\t\t\towner {\n\t\t\t\temail\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t}\n\t\t\tfiles\n\t\t\tmainFile\n\t\t\tsandpackTemplate\n\t\t\tname\n\t\t\tid\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation SignIn($email: String!, $password: String!) {\n\t\tsignIn(email: $email, password: $password) {\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t\tcookies\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SignIn($email: String!, $password: String!) {\n\t\tsignIn(email: $email, password: $password) {\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\temail\n\t\t\t}\n\t\t\tcookies\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation SignUp(\n\t\t$username: String!\n\t\t$email: String!\n\t\t$password: String!\n\t\t$confirmedPassword: String!\n\t) {\n\t\tsignUp(\n\t\t\tusername: $username\n\t\t\temail: $email\n\t\t\tpassword: $password\n\t\t\tconfirmedPassword: $confirmedPassword\n\t\t) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SignUp(\n\t\t$username: String!\n\t\t$email: String!\n\t\t$password: String!\n\t\t$confirmedPassword: String!\n\t) {\n\t\tsignUp(\n\t\t\tusername: $username\n\t\t\temail: $email\n\t\t\tpassword: $password\n\t\t\tconfirmedPassword: $confirmedPassword\n\t\t) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n'];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
