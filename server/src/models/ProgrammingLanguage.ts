import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseModel } from 'models/base/BaseModel';
import { Project } from 'models/Project';

@Entity()
@ObjectType()
export class ProgrammingLanguage extends BaseModel {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	name: string;

	@Column('varchar', { length: 15 })
	@Field()
	@IsString()
	version: string;

	@Field(() => [Project], { nullable: true })
	@OneToMany(() => Project, (project) => project.programmingLanguage, { nullable: true })
	projects: Project[];
}
