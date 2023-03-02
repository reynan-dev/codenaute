import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BaseModel } from 'models/base/BaseModel';
import { Project } from 'models/Project';
import { Session } from 'models/Session';

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

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isValidEmail: boolean;

	@Column()
	@IsString()
	hashedPassword: string;

	@Field(() => [Session], { nullable: true, defaultValue: [] })
	@OneToMany(() => Session, (session) => session.member, { nullable: true, cascade: true, })
	sessions: Session[];

	@Field(() => [Project], { nullable: true, defaultValue: [] })
	@OneToMany(() => Project, (project) => project.owner, { nullable: true, cascade: true })
	myProjects: Project[];

	@Field(() => [Project], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Project, (project) => project.editors, { nullable: true, cascade: true })
	@JoinTable()
	projects: Project[];

	@Field(() => [Project], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Project, (project) => project.favoritedBy, { nullable: true, cascade: true })
	@JoinTable()
	favoritesProjects: Project[];

	@Field(() => [Member], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Member, (member) => member.following, { nullable: true })
	@JoinTable()
	followers: Member[];

	@Field(() => [Member], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Member, (member) => member.followers, { nullable: true, cascade: true })
	@JoinTable()
	following: Member[];

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
