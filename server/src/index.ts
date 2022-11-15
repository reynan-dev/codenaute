import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";

import * as dotenv from "dotenv";
dotenv.config();

import CommonResolver from "./resolvers/CommonResolver.js";

import { connectDB } from "./db.js";

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CommonResolver],
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  const { url } = await server.listen(process.env.PORT);
  console.log(`🚀 Server ready at ${url}`);
  connectDB();
};

startServer();
