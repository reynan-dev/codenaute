import { IsEmail } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';
import BaseEntity from './base/BaseEntity';

@Entity()
@ObjectType()
export default class Member extends BaseEntity {
	@Column()
	@Field()
	username: string;

	@Column()
	@Field()
	@IsEmail()
	@Index({ unique: true })
	email: string;

	@Column()
	@Field()
	hashedPassword: string;
}
