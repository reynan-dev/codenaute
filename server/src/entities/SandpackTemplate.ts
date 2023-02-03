import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index } from 'typeorm';

@Entity()
@ObjectType()
export default class File extends BaseEntity {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	slug: string;
}
