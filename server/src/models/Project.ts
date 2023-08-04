import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { Member } from 'models/Member';
import { BaseModel } from 'models/base/BaseModel';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

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

	@Field(() => [Member], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Member, (member) => member.projectsInvitedOn, {
		eager: true,
		nullable: true,
		onDelete: 'CASCADE'
	})
	editors: Member[];

	@Field(() => [Member], { nullable: true, defaultValue: [] })
	@ManyToMany(() => Member, (member) => member.favoritedProjects, {
		eager: true,
		nullable: true,
		onDelete: 'CASCADE'
	})
	favoritedBy: Member[];

	@Column({
		type: 'enum',
		enum: SandpackTemplates
	})
	@Field()
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
	isTemplate: boolean;

	@Column('boolean', { default: false })
	@Field()
	@IsBoolean()
	isPublic: boolean;

	@DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
