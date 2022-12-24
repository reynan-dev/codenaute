import { IsDate, IsUUID } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export default class BaseModels {
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
