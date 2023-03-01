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
	'\n\tmutation UpdateEmail($email: String!) {\n\t\tupdateEmail(email: $email) {\n\t\t\temail\n\t\t\tid\n\t\t}\n\t}\n':
		types.UpdateEmailDocument,
	'\n\tmutation UpdateUsername($username: String!) {\n\t\tupdateUsername(username: $username) {\n\t\t\tusername\n\t\t\tid\n\t\t}\n\t}\n':
		types.UpdateUsernameDocument,
	'\n\tmutation SignIn($email: String!, $password: String!) {\n\t\tsignIn(email: $email, password: $password) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n':
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
	source: '\n\tmutation UpdateEmail($email: String!) {\n\t\tupdateEmail(email: $email) {\n\t\t\temail\n\t\t\tid\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdateEmail($email: String!) {\n\t\tupdateEmail(email: $email) {\n\t\t\temail\n\t\t\tid\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation UpdateUsername($username: String!) {\n\t\tupdateUsername(username: $username) {\n\t\t\tusername\n\t\t\tid\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation UpdateUsername($username: String!) {\n\t\tupdateUsername(username: $username) {\n\t\t\tusername\n\t\t\tid\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tmutation SignIn($email: String!, $password: String!) {\n\t\tsignIn(email: $email, password: $password) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation SignIn($email: String!, $password: String!) {\n\t\tsignIn(email: $email, password: $password) {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t}\n'];
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
