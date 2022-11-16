import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany } from 'typeorm';
import BaseModel from './base/BaseModel.js';

@Entity()
@ObjectType()
export default class Common extends BaseModel {
  @Column()
  @Field()
  name: string;
}
