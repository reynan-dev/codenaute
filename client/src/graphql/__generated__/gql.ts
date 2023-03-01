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
	'\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n':
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
	source: '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n'
): (typeof documents)['\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n'];
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
