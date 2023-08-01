import { Member } from 'models/Member';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthInterface {
	@Field(() => Member)
	user: Member;

	@Field(() => String)
	cookies: string;
}
