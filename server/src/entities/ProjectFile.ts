import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

import Project from 'entities/Project';
import BaseModels from 'entities/base/BaseModels';
import { ProjectType } from 'utils/types/EntitiesTypes';

@Entity()
@ObjectType()
export default class ProjectFile extends BaseModels {
	@Column()
	@Field()
	@IsString()
	path: string;

	@Column()
	@Field()
	@IsString()
	code: string;

	@Column('varchar')
	@Field(() => Project)
	@ManyToOne(() => Project, (project) => project.files)
	project: ProjectType;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isHidden: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
