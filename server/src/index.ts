import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema, NonEmptyArray } from 'type-graphql';

import { MemberResolver } from 'resolvers/MemberResolver';
import { RoutingTokenResolver } from 'resolvers/RoutingTokenResolver';
import { ProjectResolver } from 'resolvers/ProjectResolver';
import { FileProjectResolver } from 'resolvers/FileProjectResolver';
import { LanguageResolver } from 'resolvers/LanguageResolver';
import { SandpackTemplateResolver } from 'resolvers/SandpackTemplate';

import { MemberServices } from 'services/MemberServices';

import { GlobalContext } from 'utils/types/GlobalContext';
import { Cookie } from 'utils/methods/Cookie';
import { GraphQLSchema } from 'graphql/type/schema';

import { Database } from 'db';

abstract class Server {
	private static readonly MemberService: MemberServices = new MemberServices();
	private static readonly csrfPrevention: boolean = true;
	private static readonly cache: 'bounded' | undefined = 'bounded';
	private static readonly plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

	static resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
		MemberResolver,
		RoutingTokenResolver,
		ProjectResolver,
		FileProjectResolver,
		LanguageResolver,
		SandpackTemplateResolver
	];

	private static _schema(): Promise<GraphQLSchema> {
		return buildSchema({
			resolvers: this.resolvers,
			authChecker: async ({ context }) => {
				return Boolean(context.user);
			}
		});
	}

	private static _context() {
		return async (context: GlobalContext): Promise<GlobalContext> => {
			const token = Cookie.getSessionToken(context);

			const user = !token ? null : await this.MemberService.findBySessionToken(token);

			return { res: context.res, req: context.req, user };
		};
	}

	private static async _build(): Promise<ApolloServer> {
		return new ApolloServer({
			schema: await this._schema(),
			context: this._context(),
			csrfPrevention: this.csrfPrevention,
			cache: this.cache,
			plugins: this.plugins
		});
	}

	static async start() {
		await Database.start();

		const { url } = await ((await this._build()) as ApolloServer).listen(process.env.GRAPHQL_PORT);

		console.info(`🚀 Server ready at ${url}`);
	}
}

Server.start();
