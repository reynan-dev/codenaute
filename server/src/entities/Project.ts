import { Field, ObjectType } from 'type-graphql';
import {
	Column,
	DeleteDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne
} from 'typeorm';
import { IsBoolean, IsDate, IsString } from 'class-validator';

import BaseModels from 'entities/base/BaseModels';
import Language from 'entities/Language';
import File from 'entities/File';
import SandpackTemplate from 'entities/SandpackTemplate';
import Member from 'entities/Member';

@Entity()
@ObjectType()
export default class Project extends BaseModels {
	@Column()
	@Field()
	@IsString()
	name: string;

	@Column()
	@Field()
	@ManyToMany(() => Member, (member) => member.projects, { eager: true })
	members: Member[];

	@Column()
	@Field()
	@OneToMany(() => File, (file) => file.project, { eager: true })
	files: File[];

	@Column()
	@Field()
	@ManyToOne(() => Language, (language) => language.id, { eager: true })
	language: Language;

	@Column({ nullable: true })
	@Field()
	@ManyToOne(() => SandpackTemplate, (template) => template.id, { eager: true })
	template: SandpackTemplate;

	@Column({ nullable: true })
	@Field()
	@OneToOne(() => File, (file) => file.id, { eager: true })
	activeFile: File;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isTemplate: boolean;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isPublic: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
