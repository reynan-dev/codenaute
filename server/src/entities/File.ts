import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

import Project from 'entities/Project';
import BaseModels from 'entities/base/BaseModels';

@Entity()
@ObjectType()
export default class File extends BaseModels {
	@Column()
	@Field()
	@IsString()
	path: string;

	@Column()
	@Field()
	@IsString()
	code: string;

	@Column()
	@Field()
	@ManyToOne(() => Project, (project) => project.files, { eager: true })
	project: Project;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isHidden: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
