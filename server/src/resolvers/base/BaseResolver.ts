import { BaseModel } from 'models/base/BaseModel';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class BaseResolver {
	@Query(() => BaseModel)
	async HelloWorld() {
		return 'Hello World';
	}
}
