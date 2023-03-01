import { IsDate, IsEmail, IsHexadecimal } from 'class-validator';
import { randomBytes } from 'crypto';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class RoutingToken {
	constructor(email: string) {
		this.email = email;
	}

	@PrimaryColumn('varchar', { length: 32 })
	@IsHexadecimal()
	token: string;

	@Field()
	@IsEmail()
	email: string;

	@CreateDateColumn()
	@Field()
	@IsDate()
	createdAt: Date;

	@BeforeInsert()
	setToken() {
		this.token = randomBytes(16).toString('hex');
	}
}
