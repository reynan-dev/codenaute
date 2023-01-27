import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import BaseEntity from '@/entities/base/BaseEntity';

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
