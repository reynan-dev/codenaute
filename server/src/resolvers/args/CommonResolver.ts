import { Args, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export default class CommonResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
