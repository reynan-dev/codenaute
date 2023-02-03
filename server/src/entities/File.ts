import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

import Project from 'entities/Project';

@Entity()
@ObjectType()
export default class File extends BaseEntity {
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
	@ManyToOne(() => Project, { eager: true })
	project: Project;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isHidden: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
