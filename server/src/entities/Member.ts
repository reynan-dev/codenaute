import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import BaseEntity from './base/BaseEntity';

@Entity()
@ObjectType()
export default class Member extends BaseEntity {
	@Column()
	@IsString()
	@Field()
	username: string;

	@Column()
	@Field()
	@IsEmail()
	@Index({ unique: true })
	email: string;

	@IsBoolean()
	@Column({ default: false })
	@Field()
	isValidEmail: boolean;

	@Column()
	@Field()
	@IsString()
	hashedPassword: string;

	@DeleteDateColumn()
	@IsDate()
	@Field()
	deletedAt: Date;
}
