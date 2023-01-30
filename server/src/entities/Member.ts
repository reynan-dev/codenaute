import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import BaseEntity from 'entities/base/BaseEntity';

@Entity()
@ObjectType()
export default class Member extends BaseEntity {
	constructor(
		username: string,
		email: string,
		hashedPassword: string
	  ) {
		super();
		this.username = username;
		this.email = email;
		this.hashedPassword = hashedPassword;
	  }

	@Column()
	@IsString()
	@Field()
	username: string;

	@Column()
	@Field()
	@IsEmail()
	@Index({ unique: true })
	email: string;

	@Column('boolean', { default: false })
	@IsBoolean()
	isValidEmail: boolean;

	@Column()
	@IsString()
	hashedPassword: string;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
