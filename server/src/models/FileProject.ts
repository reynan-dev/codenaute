import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

import { Project } from 'models/Project';
import { BaseModel } from 'models/base/BaseModel';

@Entity()
@ObjectType()
export class FileProject extends BaseModel {
	@Column()
	@Field()
	@IsString()
	path: string;

	@Column()
	@Field()
	@IsString()
	content: string;

	@ManyToOne(() => Project, (project) => project.files)
	project: Project;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isHidden: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
