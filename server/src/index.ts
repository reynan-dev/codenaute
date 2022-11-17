import 'dotenv/config';

import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { connectDB } from './db.js';

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [''],
    }),
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  const { url } = await server.listen(process.env.GRAPHQL_PORT);

  console.log(`🚀 Server ready at ${url}`);
};
startServer();
