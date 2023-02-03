import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, Index, ManyToMany } from 'typeorm';

import BaseModels from 'entities/base/BaseModels';
import Project from 'entities/Project';

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
