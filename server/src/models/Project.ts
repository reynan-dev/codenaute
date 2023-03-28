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
import { ProgrammingLanguage } from 'models/ProgrammingLanguage';
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

	@ManyToOne(() => Member, (member) => member.ownedProjects, { eager: true })
	@JoinColumn()
	@Field(() => Member)
	owner: Member;

	@Field(() => [Member])
	@ManyToMany(() => Member, (member) => member.projectsInvitedOn, { eager: true })
	editors: Member[];

	@Field(() => [FileProject], { nullable: true, defaultValue: [] })
	@OneToMany(() => FileProject, (file) => file.project, { eager: true, nullable: true, cascade: true })
	files: FileProject[];

	@Column('varchar')
	@Field(() => ProgrammingLanguage)
	@ManyToOne(() => ProgrammingLanguage, (language) => language.id, { eager: true })
	programmingLanguage: ProgrammingLanguage;

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
	@ManyToMany(() => Member, (member) => member.favoritedProjects, { eager: true })
	favoritedBy: Member[];

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
