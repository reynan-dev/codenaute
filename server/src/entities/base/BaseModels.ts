import { IsDate, IsUUID } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import {
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	BaseEntity
} from 'typeorm';

@Entity()
@ObjectType()
export class BaseModels extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	@IsUUID()
	id: string;

	@CreateDateColumn()
	@IsDate()
	createAt: Date;

	@UpdateDateColumn()
	@IsDate()
	updateAt: Date;
}
