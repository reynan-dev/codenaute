import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseModel } from 'models/base/BaseModel';
import { Project } from 'models/Project';

@Entity()
@ObjectType()
export class SandpackTemplate extends BaseModel {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	slug: string;

	@Field(() => [Project], { nullable: true, defaultValue: [] })
	@OneToMany(() => Project, (project) => project.id, { nullable: true })
	projects: Project[];
}
