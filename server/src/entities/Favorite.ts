import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import BaseModels from 'entities/base/BaseModels';
import Member from 'entities/Member';
import Project from 'entities/Project';

@Entity()
@ObjectType()
export default class Favorite extends BaseModels {
	@Column()
	@Field()
	@ManyToOne(() => Project, (project) => project.id, { eager: true })
	project: Project;

	@Column()
	@Field()
	@ManyToOne(() => Member, (member) => member.id, { eager: true })
	member: Member;
}
