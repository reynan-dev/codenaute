import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany } from 'typeorm';
import BaseEntity from './base/BaseEntity.js';

@Entity()
@ObjectType()
export default class Common extends BaseEntity {
	@Column()
	@Field()
	name: string;
}
