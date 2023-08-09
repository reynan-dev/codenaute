import { IsBoolean, IsDate, IsString, IsEnum } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Member } from './Member';
import { BaseModel } from './base/BaseModel';
import { SandpackTemplates } from '../utils/enums/SandpackTemplates';

@Entity()
@ObjectType()
export class Project extends BaseModel {
	@Column()
	@Field()
	@IsString()
	name: string;

	@Field(() => Member)
	@ManyToOne(() => Member, (member) => member.ownedProjects, { eager: true, onDelete: 'CASCADE' })
	@JoinColumn()
	owner: Member;

	@Column({
		type: 'enum',
		enum: SandpackTemplates
	})
	@Field()
	@IsEnum(SandpackTemplates)
	sandpackTemplate: SandpackTemplates;

	@Column({ nullable: true })
	@Field()
	@IsString()
	files: string;

	@Column()
	@Field()
	@IsString()
	environment: string;

	@Column()
	@Field()
	@IsString()
	mainFile: string;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isPublic: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
