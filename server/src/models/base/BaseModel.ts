import { IsDate, IsUUID } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
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
export class BaseModel extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	@IsUUID()
	id: UUID;

	@CreateDateColumn()
	@IsDate()
	createAt: Date;

	@UpdateDateColumn()
	@IsDate()
	updateAt: Date;
}
