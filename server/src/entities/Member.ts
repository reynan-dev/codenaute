import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index, ManyToMany, OneToMany } from 'typeorm';

import BaseModels from 'entities/base/BaseModels';
import Project from 'entities/Project';
import Session from 'entities/Session';

@Entity()
@ObjectType()
export default class Member extends BaseModels {
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

	@Field(() => [Session], { nullable: true })
	@OneToMany(() => Session, (session) => session.member, { nullable: true })
	sessions: Session[];

	@Field(() => [Project], { nullable: true })
	@ManyToMany(() => Project, (project) => project.members)
	projects: Project[];

	@Field(() => [Project], { nullable: true })
	@ManyToMany(() => Project, (project) => project.favorites)
	favorites: Project[];

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
