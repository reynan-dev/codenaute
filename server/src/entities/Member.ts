import { IsEmail } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
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

	@Column({ default: false })
	@Field()
	isValidEmail: boolean;

	@Column()
	@Field()
	hashedPassword: string;

	@DeleteDateColumn()
	@Field()
	deletedAt: Date;
}
