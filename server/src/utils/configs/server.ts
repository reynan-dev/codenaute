import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault, Context } from 'apollo-server-core';
import { AuthChecker, buildSchema, NonEmptyArray } from 'type-graphql';
import { GraphQLSchema } from 'graphql/type/schema';

import { BaseResolver } from 'resolvers/base/BaseResolver';
import { MemberServices } from 'services/MemberServices';
import { GlobalContext } from 'utils/types/GlobalContext';
import { Cookie } from 'utils/methods/Cookie';
import { Database } from 'utils/configs/database';
import { Environment } from 'utils/enums/Environment';

export abstract class Server {
	private static readonly MemberService: MemberServices = new MemberServices();
	private static readonly csrfPrevention: boolean = true;
	private static readonly cache: 'bounded' | undefined = 'bounded';
	private static readonly plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

	static resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [BaseResolver];

	public static includeResolvers(resolvers: NonEmptyArray<Function> | NonEmptyArray<string>) {
		this.resolvers = [...resolvers];
	}

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

			const user = !token ? null : await this.MemberService.findOneBySessionToken(token);

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
		if (process.env.PORT == null)
			return console.error('❌ No environment variable has been set for PORT');

		await Database.start();

		const { url } = await ((await this._build()) as ApolloServer).listen(process.env.PORT);

		if (process.env.NODE_ENV != Environment.IS_PRODUCTION)
			console.info(`🚀 Server ready at ${url}`);
	}
}
