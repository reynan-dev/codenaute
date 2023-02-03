import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index } from 'typeorm';

@Entity()
@ObjectType()
export default class Language extends BaseEntity {
	@Column()
	@Field()
	@IsString()
	@Index({ unique: true })
	name: string;

	@Column('varchar', { length: 15 })
	@Field()
    @IsString()
	version: string;
}
