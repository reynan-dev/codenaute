import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import MemberResolver from 'resolvers/MemberResolver';
import RoutingTokenResolver from 'resolvers/RoutingTokenResolver';
import ProjectResolver from 'resolvers/ProjectResolver';

import MemberServices from 'services/MemberServices';

import { GlobalContext } from 'utils/types/GlobalContext';
import { Cookie } from 'utils/methods/Cookie';
import { startDatabase } from 'db';

const startServer = async () => {
	await startDatabase();

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [MemberResolver, RoutingTokenResolver, ProjectResolver],
			authChecker: async ({ context }) => {
				return Boolean(context.user);
			}
		}),
		context: async (context): Promise<GlobalContext> => {
			const token = Cookie.getSessionToken(context);

			const user = !token ? null : await MemberServices.findBySessionToken(token);

			return { res: context.res, req: context.req, user };
		},
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
	});

	const { url } = await server.listen(process.env.GRAPHQL_PORT);

	console.info(`🚀 Server ready at ${url}`);
};
startServer();
