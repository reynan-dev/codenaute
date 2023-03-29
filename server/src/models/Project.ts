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

	@Field(() => Member)
	@ManyToOne(() => Member, (member) => member.ownedProjects, { eager: true })
	@JoinColumn()
	owner: Member;

	@Field(() => [Member], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Member, (member) => member.projectsInvitedOn, { eager: true, nullable: true })
	editors: Member[];

	@Field(() => [Member], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Member, (member) => member.favoritedProjects, { eager: true, nullable: true })
	favoritedBy: Member[];

	@Field(() => [FileProject], { nullable: true, defaultValue: [] })
	@OneToMany(() => FileProject, (file) => file.project, {
		eager: true,
		nullable: true,
		cascade: true
	})
	files: FileProject[];

	@Field(() => ProgrammingLanguage)
	@ManyToOne(() => ProgrammingLanguage, (programmingLanguage) => programmingLanguage.projects, {
		eager: true
	})
	programmingLanguage: ProgrammingLanguage;

	@Field(() => SandpackTemplate, { nullable: true })
	@ManyToOne(() => SandpackTemplate, (template) => template.id, { eager: true, nullable: true })
	template: SandpackTemplate;

	@Field(() => FileProject, { nullable: true })
	@OneToOne(() => FileProject, (file) => file.id, { eager: true, nullable: true })
	@JoinColumn()
	activeFile: FileProject;

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
