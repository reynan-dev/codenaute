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
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
	'\n\tquery Profile {\n\t\tprofile {\n\t\t\tid\n\t\t\tusername\n\t\t\temail\n\t\t}\n\t}\n':
		types.ProfileDocument,
	'\n\tmutation CreateProject(\n\t\t$name: String!\n\t\t$memberId: String!\n\t\t$isTemplate: Boolean!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$main: String!\n\t) {\n\t\tcreateProject(\n\t\t\tname: $name\n\t\t\tmemberId: $memberId\n\t\t\tisTemplate: $isTemplate\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmain: $main\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tfiles\n\t\t\tisTemplate\n\t\t\tisPublic\n\t\t\tsandpackTemplate\n\t\t}\n\t}\n':
		types.CreateProjectDocument,
	'\n\tquery GetAllMembers {\n\t\tgetAllMembers {\n\t\t\temail\n\t\t\tusername\n\t\t}\n\t}\n':
		types.GetAllMembersDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
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
	source: '\n\tmutation CreateProject(\n\t\t$name: String!\n\t\t$memberId: String!\n\t\t$isTemplate: Boolean!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$main: String!\n\t) {\n\t\tcreateProject(\n\t\t\tname: $name\n\t\t\tmemberId: $memberId\n\t\t\tisTemplate: $isTemplate\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmain: $main\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tfiles\n\t\t\tisTemplate\n\t\t\tisPublic\n\t\t\tsandpackTemplate\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation CreateProject(\n\t\t$name: String!\n\t\t$memberId: String!\n\t\t$isTemplate: Boolean!\n\t\t$isPublic: Boolean!\n\t\t$sandpackTemplate: String!\n\t\t$files: String!\n\t\t$environment: String!\n\t\t$main: String!\n\t) {\n\t\tcreateProject(\n\t\t\tname: $name\n\t\t\tmemberId: $memberId\n\t\t\tisTemplate: $isTemplate\n\t\t\tisPublic: $isPublic\n\t\t\tsandpackTemplate: $sandpackTemplate\n\t\t\tfiles: $files\n\t\t\tenvironment: $environment\n\t\t\tmain: $main\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t\tfiles\n\t\t\tisTemplate\n\t\t\tisPublic\n\t\t\tsandpackTemplate\n\t\t}\n\t}\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: '\n\tquery GetAllMembers {\n\t\tgetAllMembers {\n\t\t\temail\n\t\t\tusername\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery GetAllMembers {\n\t\tgetAllMembers {\n\t\t\temail\n\t\t\tusername\n\t\t}\n\t}\n'];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
