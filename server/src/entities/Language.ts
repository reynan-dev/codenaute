import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import BaseModels from 'entities/base/BaseModels';
import Project from 'entities/Project';

@Entity()
@ObjectType()
export default class Language extends BaseModels {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	name: string;

	@Column('varchar', { length: 15 })
	@Field()
	@IsString()
	version: string;

	@Field(() => Project)
	@OneToMany(() => Project, (project) => project.language)
	projects: Project;
}
