import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index, OneToMany } from 'typeorm';

import { BaseModel } from './base/BaseModel';
import { Project } from './Project';
import { Session } from './Session';

@Entity()
@ObjectType()
export class Member extends BaseModel {
	@Column()
	@Field()
	@IsString()
	username: string;

	@Column()
	@Field()
	@IsEmail()
	@Index({ unique: true })
	email: string;

	@Column()
	@IsString()
	hashedPassword: string;

	@Field(() => [Session], { nullable: true, defaultValue: [] })
	@OneToMany(() => Session, (session) => session.member, { nullable: true, cascade: true })
	sessions: Session[];

	@Field(() => [Project], { nullable: true, defaultValue: [] })
	@OneToMany(() => Project, (project) => project.owner, { nullable: true, cascade: true })
	ownedProjects: Project[];

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
