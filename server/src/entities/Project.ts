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
import ProjectFile from 'entities/ProjectFile';
import SandpackTemplate from 'entities/SandpackTemplate';
import Member from 'entities/Member';
import {
	LanguageType,
	MemberType,
	ProjectFileType,
	SandpackTemplateType
} from 'utils/types/EntitiesTypes';

@Entity()
@ObjectType()
export default class Project extends BaseModels {
	@Column()
	@Field()
	@IsString()
	name: string;

	@Column('text')
	@Field(() => [Member])
	@ManyToMany(() => Member, (member) => member.projects, { eager: true })
	members: MemberType[];

	@Column('text')
	@Field(() => [ProjectFile], { nullable: true })
	@OneToMany(() => ProjectFile, (file) => file.project, { eager: true })
	files: ProjectFileType[];

	@Column('varchar')
	@Field(() => Language)
	@ManyToOne(() => Language, (language) => language.id, { eager: true })
	language: LanguageType;

	@Column('varchar', { nullable: true })
	@Field(() => SandpackTemplate, { nullable: true })
	@ManyToOne(() => SandpackTemplate, (template) => template.id, { eager: true })
	template: SandpackTemplateType;

	@Column('varchar', { nullable: true })
	@Field(() => ProjectFile, { nullable: true })
	@OneToOne(() => ProjectFile, (file) => file.id, { eager: true })
	activeFile: ProjectFileType;

	@Field(() => [Member], { nullable: true })
	@ManyToMany(() => Member, (member) => member.favorites, { eager: true })
	favorites: MemberType[];

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
