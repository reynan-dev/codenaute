import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import BaseModels from 'entities/base/BaseModels';
import Project from 'entities/Project';

@Entity()
@ObjectType()
export default class File extends BaseModels {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	slug: string;

	@Field(() => [Project], { nullable: true })
	@OneToMany(() => Project, (project) => project.id, { eager: true })
	projects: Project;
}
