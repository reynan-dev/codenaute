import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import MemberResolver from './resolvers/MemberResolver.js';
import MemberServices from './services/MemberServices.js';

import { GlobalContext } from './utils/GlobalContext.js';
import { getSessionIdInCookie } from './utils/getSessionIdInCookie.js';
import { startDatabase } from './db.js';

const startServer = async () => {
	await startDatabase();

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [MemberResolver],
			authChecker: ({ context }) => {
				return Boolean(context.user);
			}
		}),
		context: async (context): Promise<GlobalContext> => {
			const sessionId = getSessionIdInCookie(context);
			const user = !sessionId ? null : await MemberServices.findBySessionToken(sessionId);

			return { res: context.res, req: context.req, user };
		},
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
	});

	const { url } = await server.listen(process.env.GRAPHQL_PORT);

	console.log(`🚀 Server ready at ${url}`);
};
startServer();
