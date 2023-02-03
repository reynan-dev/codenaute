import { IsString } from 'class-validator';
import Member from 'entities/Member';
import Project from 'entities/Project';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export default class Favorite extends BaseEntity {
	@Column()
	@Field()
	@ManyToOne(() => Project, {eager: true})
	project: Project;

	@Column()
	@Field()
	@ManyToOne(() => Member, {eager: true})
	member: Member;
}
