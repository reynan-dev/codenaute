import { Field, ObjectType } from 'type-graphql';
import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne
} from 'typeorm';
import { IsBoolean, IsDate, IsString } from 'class-validator';

import { BaseModel } from 'models/base/BaseModel';
import { ProgramingLanguage } from 'models/ProgramingLanguage';
import { FileProject } from 'models/FileProject';
import { SandpackTemplate } from 'models/SandpackTemplate';
import { Member } from 'models/Member';

@Entity()
@ObjectType()
export class Project extends BaseModel {
	@Column()
	@Field()
	@IsString()
	name: string;

	@Column('text')
	@Field(() => [Member])
	@ManyToMany(() => Member, (member) => member.projects, { eager: true })
	members: Member[];

	@Field(() => [FileProject], { nullable: true, defaultValue: [] })
	@OneToMany(() => FileProject, (file) => file.project, { eager: true, nullable: true, cascade: true })
	files: FileProject[];

	@Column('varchar')
	@Field(() => ProgramingLanguage)
	@ManyToOne(() => ProgramingLanguage, (language) => language.id, { eager: true })
	language: ProgramingLanguage;

	@Column('varchar', { nullable: true })
	@Field(() => SandpackTemplate, { nullable: true })
	@ManyToOne(() => SandpackTemplate, (template) => template.id, { eager: true })
	template: SandpackTemplate;

	@Column('varchar', { nullable: true })
	@Field(() => FileProject, { nullable: true })
	@OneToOne(() => FileProject, (file) => file.id, { eager: true })
	@JoinColumn()
	activeFile: FileProject;

	@Field(() => [Member], { nullable: true, defaultValue: [] })
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
