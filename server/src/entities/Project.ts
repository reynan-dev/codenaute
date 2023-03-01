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
import FileProject from 'entities/FileProject';
import SandpackTemplate from 'entities/SandpackTemplate';
import Member from 'entities/Member';

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
	members: Member[];

	@Column('text')
	@Field(() => [FileProject], { nullable: true })
	@OneToMany(() => FileProject, (file) => file.project)
	files: FileProject[];

	@Column('varchar')
	@Field(() => Language)
	@ManyToOne(() => Language, (language) => language.id, { eager: true })
	language: Language;

	@Column('varchar', { nullable: true })
	@Field(() => SandpackTemplate, { nullable: true })
	@ManyToOne(() => SandpackTemplate, (template) => template.id, { eager: true })
	template: SandpackTemplate;

	@Column('varchar', { nullable: true })
	@Field(() => FileProject, { nullable: true })
	@OneToOne(() => FileProject, (file) => file.id, { eager: true })
	activeFile: FileProject;

	@Field(() => [Member], { nullable: true })
	@ManyToMany(() => Member, (member) => member.favorites, { eager: true })
	favorites: Member[];

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
