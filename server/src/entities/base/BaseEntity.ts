import { Field, ID, ObjectType } from 'type-graphql';
import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export default class BaseModels {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string;

	@CreateDateColumn()
	@Field()
	createAt: Date;

	@UpdateDateColumn()
	@Field()
	updateAt: Date;

	@DeleteDateColumn()
	@Field()
	deletedAt: Date;
}
