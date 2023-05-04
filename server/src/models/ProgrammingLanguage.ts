import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseModel } from 'models/base/BaseModel';
import { Project } from 'models/Project';
import { FileProject } from 'models/FileProject';

@Entity()
@ObjectType()
export class ProgrammingLanguage extends BaseModel {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	name: string;

	@Field(() => [FileProject], { nullable: true })
	@OneToMany(() => FileProject, (file) => file.programmingLanguage, { nullable: true })
	files: FileProject[];
}
