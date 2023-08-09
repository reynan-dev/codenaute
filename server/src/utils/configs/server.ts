import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { GraphQLSchema } from 'graphql/type/schema';
import { BaseResolver } from 'resolvers/base/BaseResolver';
import { MemberServices } from 'services/MemberServices';
import { GlobalContext } from 'utils/types/GlobalContext';
import { Cookie } from 'utils/methods/Cookie';
import { Database } from 'utils/configs/database';
import { Environment } from 'utils/enums/Environment';
import { catchError } from 'utils/methods/catchErrors';
import express from 'express';
import cors from 'cors';

export abstract class Server {
	private static readonly app: express.Application = express();

	private static readonly MemberService: MemberServices = new MemberServices();
	private static readonly csrfPrevention: boolean = true;
	private static readonly cache: 'bounded' | undefined = 'bounded';
	private static readonly plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

	private static resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [BaseResolver];

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
			introspection: true,
			context: this._context(),
			csrfPrevention: this.csrfPrevention,
			cache: this.cache,
			plugins: this.plugins
		});
	}

	private static async _healthCheck() {
		this.app.get('/healthz', (req, res) => {
			try {
				console.info('👍 Health check passed');
				res.status(204).send();
			} catch (error) {
				catchError(error, res);
			}
		});
	}

	private static _middlewares() {
		this.app.use(cors({ credentials: true, origin: true, optionsSuccessStatus: 200 }));

		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept, Authorization'
			);
			next();
		});
	}

	private static async _apolloStart() {
		const server = await this._build();

		await server.start();

		this._middlewares();

		server.applyMiddleware({
			path: '/graphql',
			app: this.app
		});
	}

	static async start() {
		if (process.env.PORT == null)
			return console.error('❌ No environment variable has been set for PORT');

		await Database.start();

		await this._apolloStart();

		this._healthCheck();

		this.app.listen(process.env.PORT);

		if (process.env.NODE_ENV != Environment.IS_PRODUCTION)
			console.info(`🚀 Server ready and running at port ${process.env.PORT}`);
	}
}
